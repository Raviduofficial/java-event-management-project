package com.neoarkbyte.rutech.service;

import com.neoarkbyte.rutech.dto.UserCreateDTO;
import com.neoarkbyte.rutech.entity.*;
import com.neoarkbyte.rutech.mapper.UserMapper;
import com.neoarkbyte.rutech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserFactory userFactory;
    private final AuthenticationManager authManager;


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

    public String verify(User user) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword()));

        if (authentication.isAuthenticated()) {
//            String token = jwtService.generateAccessToken(user.getUserName());
//            return new AuthResponse(token, "Login Successful");
            return "Login Successfull";
        }

//        return new AuthResponse("", "Login Failed");
        return "Login Failed";
    }


}
