package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.dto.auth.TokenRefreshDTO;
import com.neoarkbyte.rutech.dto.auth.UserCreateDTO;
import com.neoarkbyte.rutech.dto.auth.UserLoginDTO;
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
    public ResponseEntity<TokenPair> login(@RequestBody UserLoginDTO dto){
        TokenPair response = authService.verify(dto);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenPair> login(@RequestBody TokenRefreshDTO dto){
        System.out.println(dto.getRefreshToken());
        TokenPair response = authService.refreshToken(dto);

        return ResponseEntity.ok(response);
    }

}
