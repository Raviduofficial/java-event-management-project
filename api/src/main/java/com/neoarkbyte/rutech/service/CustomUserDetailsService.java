package com.neoarkbyte.rutech.service;

import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.entity.UserPrincipal;
import com.neoarkbyte.rutech.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

        private final UserRepository userRepo;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            User user = userRepo.findByUserName(username);

            if(user == null){
                throw new UsernameNotFoundException("user not found");
            }

            return new UserPrincipal(user);
        }
    }

