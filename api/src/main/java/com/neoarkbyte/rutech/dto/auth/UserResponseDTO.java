package com.neoarkbyte.rutech.dto.auth;

import com.neoarkbyte.rutech.type.ROLE;
import lombok.Data;

@Data
public class UserResponseDTO {
    private String userId;
    private String userName;
    private String name;
    private String email;
    private String telephone;
    private String address;
    private ROLE role;
}
