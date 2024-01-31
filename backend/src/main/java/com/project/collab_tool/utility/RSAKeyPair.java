package com.project.collab_tool.utility;

import org.springframework.stereotype.Component;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;


@Component
public class RSAKeyPair {

    private KeyPair rsaKeyPair = generateRSAKeyPair();

    public RSAPublicKey getPublicKey() {
        return (RSAPublicKey) rsaKeyPair.getPublic();
    }

    public RSAPrivateKey getPrivateKey() {
        return (RSAPrivateKey) rsaKeyPair.getPrivate();
    }


    private KeyPair generateRSAKeyPair() {
        KeyPair keyPair;
        try {
            KeyPairGenerator rsaKeysGenerator = KeyPairGenerator.getInstance("RSA");
            rsaKeysGenerator.initialize(2048);
            keyPair = rsaKeysGenerator.generateKeyPair();
        } catch (Exception e) {
            throw new IllegalArgumentException();
        }
        return keyPair;
    }
}
