package com.project.collab_tool.controller;


import com.project.collab_tool.dto.LoginRequest;
import com.project.collab_tool.dto.LoginResponse;
import com.project.collab_tool.dto.SignupRequest;
import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest);
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@RequestBody SignupRequest signupRequest) {
        var res = authenticationService.signup(signupRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

}
