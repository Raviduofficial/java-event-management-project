package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.TokenPair;
import com.neoarkbyte.rutech.dto.auth.*;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.entity.UserFactory;
import com.neoarkbyte.rutech.exception.custom.UserNotFoundException;
import com.neoarkbyte.rutech.mapper.UserMapper;
import com.neoarkbyte.rutech.repository.UserRepository;
import com.neoarkbyte.rutech.type.ROLE;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserFactory userFactory;
    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;
    private final UserMapper userMapper;


    @Transactional
    public UserResponseDTO register(UserCreateDTO createDto) {

        if (createDto.getUserName() == null || createDto.getUserName().isBlank()) {
            throw new RuntimeException("Username is required");
        }

        if(userRepository.existsByUserName(createDto.getUserName())) {
            throw new IllegalArgumentException("Username is already in use");
        }

        if (createDto.getRole() == null) {
            throw new RuntimeException("Role is required");
        }

        User user = userFactory.createUser(createDto);
        user.setPassword(passwordEncoder.encode(createDto.getPassword()));

        user = userRepository.save(user);
        return userMapper.toResponseDTO(user);
    }

    @Transactional
    public UserResponseDTO updateUser(String id, UserCreateDTO updateDto) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        User user = userFactory.updateUser(updateDto, existingUser);

        if (updateDto.getPassword() != null && !updateDto.getPassword().isBlank()) {
            if (!passwordEncoder.matches(updateDto.getPassword(), existingUser.getPassword())) {
                user.setPassword(passwordEncoder.encode(updateDto.getPassword()));
            }
        }

        return userMapper.toResponseDTO(user);
    }

    public List<?> getUsersByRole(ROLE role) {
        return switch (role) {
            case BATCH_REP    -> userMapper.toBatchRepResponseDTOs(userRepository.findByRole(role));
            case ORGANIZATION -> userMapper.toOrgResponseDTOs(userRepository.findByRole(role));
            case ADMIN_LEC    -> userMapper.toLecResponseDTOs(userRepository.findByRole(role));
            default           -> userMapper.toResponseDTOs(userRepository.findByRole(role));
        };
    }

    public OrgResponseDTO getOrganization(String id) {
        if (!userRepository.existsById(id)) throw new UserNotFoundException("Organization not found with id : " + id);
        return userMapper.toOrgResponseDTO(userRepository.findByUserId(id));
    }

    public BatchRepResponseDTO getBatchRep(String id) {
        if (!userRepository.existsById(id)) throw new UserNotFoundException("Batch Rep not found with id : " + id);
        return userMapper.toBatchRepResponseDTO(userRepository.findByUserId(id));
    }

    public LecResponseDTO getLecturer(String id) {
        if (!userRepository.existsById(id)) throw new UserNotFoundException("Lecturer not found with id : " + id);
        return userMapper.toLecResponseDTO(userRepository.findByUserId(id));
    }

    public void deleteUser(String id){
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
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

    public User getUserByUsername(String username) {
        User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UserNotFoundException("User not found with username: " + username);
        }
        return user;
    }
}
