package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.dto.auth.UserCreateDTO;
import com.neoarkbyte.rutech.dto.auth.UserLoginDTO;
import com.neoarkbyte.rutech.entity.*;
import com.neoarkbyte.rutech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserFactory userFactory;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;


    public User register(UserCreateDTO dto) {

        System.out.println(dto.getUserName());

        if (dto.getUserName() == null || dto.getUserName().isBlank()) {
            throw new RuntimeException("Username is required");
        }

        if(userRepository.existsByUserName(dto.getUserName())) {
            throw new IllegalArgumentException("Username is already in use");
        }

        if (dto.getRole() == null) {
            throw new RuntimeException("Role is required");
        }

        User user = userFactory.createUser(dto);
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return userRepository.save(user);
    }

    public TokenPair verify(UserLoginDTO user) {

        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUserName(),
                        user.getPassword()
                )
        );

        if (!authentication.isAuthenticated()) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateTokenPair(authentication);
    }

    public TokenPair refreshToken(String refreshToken) {

        if(!jwtService.isRefreshToken(refreshToken)) {
            throw new IllegalArgumentException("Invalid refresh token");
        }

        boolean revoked = jwtService.revokeRefreshToken(refreshToken);
        if (!revoked) {
            throw new IllegalArgumentException("Refresh token is invalid or already used");
        }

        String user = jwtService.extractUsernameFromToken(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(user);

        if (userDetails == null) {
            throw new IllegalArgumentException("User not found");
        }

        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );

        return jwtService.generateTokenPair(authentication);
    }


}
