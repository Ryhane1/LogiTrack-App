package org.example.logitrackback.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.example.logitrackback.auth.dto.UserLogin;
import org.example.logitrackback.auth.dto.UserResponse;
import org.example.logitrackback.auth.dto.UserSignUp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody UserSignUp userSignUp) {
        UserResponse response = authService.register(userSignUp);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody UserLogin userLogin) {
        UserResponse response = authService.login(userLogin);
        return ResponseEntity.ok(response);
    }

}
