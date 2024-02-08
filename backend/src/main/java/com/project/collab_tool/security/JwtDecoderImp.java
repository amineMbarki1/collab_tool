package com.project.collab_tool.security;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;

import java.text.ParseException;


public class JwtDecoderImp implements JwtDecoder {
    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            JWT parsed = JWTParser.parse(token);
            JWTClaimsSet jwtClaimsSet = parsed.getJWTClaimsSet();
            jwtClaimsSet.getIssuer();

            //TODO: Depending on the issuer returns the corresponding decoder

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }


        return null;
    }
}
