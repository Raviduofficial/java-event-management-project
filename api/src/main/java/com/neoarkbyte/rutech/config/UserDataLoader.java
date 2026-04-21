package com.neoarkbyte.rutech.config;

import com.neoarkbyte.rutech.entity.BatchRep;
import com.neoarkbyte.rutech.entity.Lecturer;
import com.neoarkbyte.rutech.entity.Organization;
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

            if (!userRepository.existsByUserName("BATCH_REP")) {
                User rep = new BatchRep();
                rep.setUserName("BATCH_REP");
                rep.setName("batch_rep_test");
                rep.setPassword(passwordEncoder.encode("rep123"));
                rep.setRole(ROLE.BATCH_REP);

                userRepository.save(rep);
                System.out.println("Default rep user created successfully.");
            }

            if (!userRepository.existsByUserName("ORG")) {
                User org = new Organization();
                org.setUserName("ORG");
                org.setName("organization_test");
                org.setPassword(passwordEncoder.encode("org123"));
                org.setRole(ROLE.ORGANIZATION);

                userRepository.save(org);
                System.out.println("Default org user created successfully.");
            }
        } catch (Exception e) {
            System.err.println("Failed to create default user: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
}