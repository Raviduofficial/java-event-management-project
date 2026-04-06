package com.neoarkbyte.rutech.entity;

import com.neoarkbyte.rutech.dto.UserCreateDTO;
import com.neoarkbyte.rutech.mapper.UserMapper;
import com.neoarkbyte.rutech.type.ROLE;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserFactory {
    private final UserMapper userMapper;

    public User createUser(UserCreateDTO dto) {
        User user;

        switch (dto.getRole()) {
            case ADMIN_LEC -> {
                user = new Lecturer();
                userMapper.updateUserFromDto(dto, (Lecturer) user);
            }
            case BATCH_REP -> {
                user = new BatchRep();
                userMapper.updateUserFromDto(dto, (BatchRep) user);
            }
            case ORGANIZATION -> {
                user = new Organization();
                userMapper.updateUserFromDto(dto, (Organization) user);
            }
            default -> throw new IllegalArgumentException("Invalid role: " + dto.getRole());
        }

        return user;
    }
}