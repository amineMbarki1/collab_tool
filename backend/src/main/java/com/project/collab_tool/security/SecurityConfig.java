package com.project.collab_tool.security;


import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import com.project.collab_tool.model.OauthUserInfo;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.OauthUserInfoRepository;
import com.project.collab_tool.repository.UserRepository;
import com.project.collab_tool.utility.RSAKeyPair;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.server.ResponseStatusException;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final RSAKeyPair rsaKeyPair;
    private final UserRepository userRepository;
    private final OauthUserInfoRepository oauthUserInfoRepository;

    @Bean
    @Order(2)
    public SecurityFilterChain passwordAuthSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(csrf -> csrf.disable());
        httpSecurity.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.authorizeHttpRequests(authorize ->
                authorize.requestMatchers("/api/login",
                                "/api/signup",
                                "/api/notifications/**",
                                 "/swagger-ui/**",
                                "/api-docs/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated());
        httpSecurity.oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                        .decoder(passwordAuthJwtDecoder())
                        .jwtAuthenticationConverter(jwtConverter())
                ));
        return httpSecurity.build();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain googleOauthSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable);
        http.securityMatcher(httpRequest -> {
            if (httpRequest.getHeader("X-Auth-Type") == null) return false;
            return httpRequest.getHeader("X-Auth-Type").equals("google-oauth");
        });
        http.oauth2ResourceServer(resourceServer -> resourceServer
                .jwt(jwtConfigurer -> jwtConfigurer
                        .decoder(googleOauthJwtDecoder())
                        .jwtAuthenticationConverter(googleOauthJwtConverter())
                ));
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.authorizeHttpRequests(authorize -> authorize.requestMatchers("/public").permitAll().anyRequest().authenticated());
        return http.build();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeyPair.getPublicKey()).privateKey(rsaKeyPair.getPrivateKey()).build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(new JWKSet(jwk));
        return new NimbusJwtEncoder(jwks);
    }

    @Bean
    public JwtDecoder passwordAuthJwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeyPair.getPublicKey()).build();
    }

    @Bean
    JwtDecoder googleOauthJwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri("https://www.googleapis.com/oauth2/v3/certs").build();
    }

    @Bean
    Converter<Jwt, AbstractAuthenticationToken> googleOauthJwtConverter() {
        return new Converter<Jwt, AbstractAuthenticationToken>() {
            @Override
            public AbstractAuthenticationToken convert(Jwt jwt) {
                var authenticationToken = new JwtAuthenticationToken(jwt);
                authenticationToken.setAuthenticated(true);

                oauthUserInfoRepository.findBySub(jwt.getClaim("sub")).ifPresentOrElse(authenticationToken::setDetails, () -> {
                    OauthUserInfo oauthUserInfo = new OauthUserInfo();
                    oauthUserInfo.setFirstName(jwt.getClaim("given_name"));
                    oauthUserInfo.setLastName(jwt.getClaim("last_name"));
                    oauthUserInfo.setEmail(jwt.getClaim("email"));
                    oauthUserInfoRepository.save(oauthUserInfo);
                    authenticationToken.setDetails(oauthUserInfo);
                });

                return authenticationToken;

            }
        };
    }

    @Bean
    Converter<Jwt, AbstractAuthenticationToken> jwtConverter() {
        return new Converter<Jwt, AbstractAuthenticationToken>() {
            @Override
            public AbstractAuthenticationToken convert(Jwt jwt) {
                var authenticationToken = new JwtAuthenticationToken(jwt);
                authenticationToken.setAuthenticated(true);
                UserInfo userInfo = userRepository.findById(Long.parseLong(jwt.getSubject())).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED));
                authenticationToken.setDetails(userInfo);
                return authenticationToken;

            }
        };
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        var daoAuthProvider = new DaoAuthenticationProvider();
        daoAuthProvider.setUserDetailsService(userDetailsService());
        daoAuthProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(daoAuthProvider);
    }


}
