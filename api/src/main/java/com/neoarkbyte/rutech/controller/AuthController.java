package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.UserCreateDTO;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User addStudent(@RequestBody UserCreateDTO dto){
        return authService.register(dto);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        String response = authService.verify(user);

//        return ResponseEntity.ok(response);
        return response;
    }

}
