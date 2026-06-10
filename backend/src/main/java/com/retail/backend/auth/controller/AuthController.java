package com.retail.backend.auth.controller;

import com.retail.backend.auth.dto.RegisterRequest;
import com.retail.backend.auth.service.AuthService;
import org.springframework.web.bind.annotation.*;
import com.retail.backend.auth.dto.LoginRequest;
import com.retail.backend.auth.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request
    ) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        String token =
                authService.login(request);

        return new LoginResponse(token);
    }
}