package com.project.collab_tool.service;


import com.project.collab_tool.dto.LoginRequest;
import com.project.collab_tool.dto.LoginResponse;
import com.project.collab_tool.dto.SignupRequest;
import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.UserRepository;
import com.project.collab_tool.utility.TokenUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final TokenUtility tokenUtility;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public LoginResponse login(LoginRequest loginRequest) {
        return authenticateUser(loginRequest);
    }

    public LoginResponse signup(SignupRequest signupRequest) {
        UserInfo user = UserInfo.builder()
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .email(signupRequest.getEmail())
                .build();
        UserInfo newUser = userRepository.save(user);

        return authenticateUser(new LoginRequest(signupRequest.getEmail(), signupRequest.getPassword()));
    }

    private LoginResponse authenticateUser(LoginRequest loginRequest) {

        //var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());
        //Authentication authentication = authenticationManager.authenticate(authenticationToken);
        //var token = tokenUtility.generateToken(loginRequest.getEmail());
        //SecurityContextHolder.getContext().setAuthentication(authentication);
        //var userInfo = (UserInfo) authentication.getPrincipal();

        UserInfo userInfo = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        boolean doPasswordsMatch = passwordEncoder.matches(loginRequest.getPassword(), userInfo.getPassword());
        if(!doPasswordsMatch) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        var token = tokenUtility.generateToken(Long.toString(userInfo.getId()));
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(userInfo, userResponse);
        return LoginResponse.builder().accessToken(token).user(userResponse).build();
    }

}
