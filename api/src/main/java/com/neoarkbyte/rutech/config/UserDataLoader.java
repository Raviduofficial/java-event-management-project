package com.neoarkbyte.rutech.config;

import com.neoarkbyte.rutech.entity.Lecturer;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.repository.UserRepository;
import com.neoarkbyte.rutech.type.ROLE;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDataLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        try {
            if (!userRepository.existsByUserName("ADMIN")) {
                User admin = new Lecturer();
                admin.setUserName("ADMIN");
                admin.setName("admin_test");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(ROLE.ADMIN_LEC);

                userRepository.save(admin);
                System.out.println("Default admin user created successfully.");
            }
        } catch (Exception e) {
            System.err.println("Failed to create default user: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
