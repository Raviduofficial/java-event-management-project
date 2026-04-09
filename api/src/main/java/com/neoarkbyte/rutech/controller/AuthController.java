package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.dto.auth.TokenRefreshDTO;
import com.neoarkbyte.rutech.dto.auth.UserCreateDTO;
import com.neoarkbyte.rutech.dto.auth.UserLoginDTO;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.service.AuthService;
import com.neoarkbyte.rutech.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public User addStudent(@RequestBody UserCreateDTO dto){
        return authService.register(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDTO dto){

        TokenPair tokenPair = authService.verify(dto);

        ResponseCookie refreshCookie = buildRefreshCookie(tokenPair.getRefreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(Map.of("accessToken", tokenPair.getAccessToken()));
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken
    ){

        if (refreshToken == null) {
            return ResponseEntity.status(401).body("Missing refresh token");
        }

        TokenPair tokenPair = authService.refreshToken(refreshToken);

        ResponseCookie refreshCookie = buildRefreshCookie(tokenPair.getRefreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(Map.of("accessToken", tokenPair.getAccessToken()));
    }

    private ResponseCookie buildRefreshCookie(String token) {
        return ResponseCookie.from("refreshToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/api/auth/refresh-token")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> userInfo(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        String username = jwtService.extractUsernameFromToken(token);
        String role = jwtService.extractRoleFromToken(token);

        Map<String, Object> response = new HashMap<>();
        response.put("username", username);
        response.put("role", role);

        return ResponseEntity.ok(Map.of(
                "username", username,
                "role", role
        ));

    }

    @GetMapping("/logout")
    public ResponseEntity<?> userLogout() {
        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth/refresh-token")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body(Map.of("message", "Logged out successfully"));
    }

}
