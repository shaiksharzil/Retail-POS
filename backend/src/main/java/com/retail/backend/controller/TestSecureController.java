package com.retail.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestSecureController {

    @GetMapping("/api/test/secure")
    public String secure() {
        return "JWT Working";
    }
}