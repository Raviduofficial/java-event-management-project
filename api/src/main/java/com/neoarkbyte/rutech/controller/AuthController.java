package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.dto.auth.*;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.service.impl.AuthService;
import com.neoarkbyte.rutech.service.impl.JwtService;
import com.neoarkbyte.rutech.type.ROLE;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> addStudent(@RequestBody UserCreateDTO dto){
        UserResponseDTO user = authService.register(dto);
        return ResponseEntity.ok(ResponseUtil.success("User registered successfully", user, null));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<?>>> getUsersByRole(@RequestParam ROLE role) {
        List<?> users = authService.getUsersByRole(role);

        return ResponseEntity.ok(
                ResponseUtil.success("Users fetched successfully for role: " + role, users, null)
        );
    }

    @GetMapping("org/{id}")
    public ResponseEntity<ApiResponse<OrgResponseDTO>> getOrgById(@PathVariable String id) {
        OrgResponseDTO response = authService.getOrganization(id);
        return ResponseEntity.ok(ResponseUtil.success("Organization retrieved successfully", response, null));
    }

    @GetMapping("rep/{id}")
    public ResponseEntity<ApiResponse<BatchRepResponseDTO>> getRepById(@PathVariable String id) {
        BatchRepResponseDTO response = authService.getBatchRep(id);
        return ResponseEntity.ok(ResponseUtil.success("Organization retrieved successfully", response, null));
    }

    @GetMapping("lec/{id}")
    public ResponseEntity<ApiResponse<LecResponseDTO>> getLecById(@PathVariable String id) {
        LecResponseDTO response = authService.getLecturer(id);
        return ResponseEntity.ok(ResponseUtil.success("Organization retrieved successfully", response, null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable String id) {
        authService.deleteUser(id);
        return ResponseEntity.ok(ResponseUtil.success("User deleted successfully", null, null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Map<String, String>>> login(@RequestBody UserLoginDTO dto){

        TokenPair tokenPair = authService.verify(dto);

        ResponseCookie refreshCookie = buildRefreshCookie(tokenPair.getRefreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(ResponseUtil.success("Login successful", Map.of("accessToken", tokenPair.getAccessToken()), null));
    }


    @PutMapping("update/{id}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateEvent(@PathVariable String id, @Valid @RequestBody UserCreateDTO updateDTO) {
        UserResponseDTO response = authService.updateUser(id, updateDTO);
        return ResponseEntity.ok(ResponseUtil.success("User updated successfully", response, null));
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshToken(
            @CookieValue(name = "refreshToken", required = true) String refreshToken
    ){

        if (refreshToken == null) {
            return ResponseEntity.status(401).body(ResponseUtil.error("Missing refresh token", null));
        }

        TokenPair tokenPair = authService.refreshToken(refreshToken);

        ResponseCookie refreshCookie = buildRefreshCookie(tokenPair.getRefreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                .body(ResponseUtil.success("Token refreshed successfully", Map.of("accessToken", tokenPair.getAccessToken()), null));
    }

    private ResponseCookie buildRefreshCookie(String token) {
        return ResponseCookie.from("refreshToken", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<Map<String, Object>>> userInfo(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(ResponseUtil.error("Missing or invalid Authorization header", null));
        }

        String token = authHeader.substring(7);

        String username = jwtService.extractUsernameFromToken(token);
        String role = jwtService.extractRoleFromToken(token);

        User userEntity = authService.getUserByUsername(username);

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("userId", userEntity.getUserId());
        responseData.put("username", username);
        responseData.put("role", role);

        return ResponseEntity.ok(ResponseUtil.success("User information retrieved", responseData, null));

    }

    @GetMapping("/logout")
    public ResponseEntity<ApiResponse<Map<String, String>>> userLogout(Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            jwtService.revokeAllRefreshTokensByUserId(authentication);
        }

        ResponseCookie deleteCookie = ResponseCookie.from("refreshToken", "")
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, deleteCookie.toString())
                .body(ResponseUtil.success("Logged out successfully", Map.of("message", "Logged out successfully"), null));
    }

}
