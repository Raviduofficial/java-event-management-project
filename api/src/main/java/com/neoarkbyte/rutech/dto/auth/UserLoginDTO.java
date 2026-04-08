package com.neoarkbyte.rutech.dto.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserLoginDTO {
    @NotBlank(message = "Username is required")
    private String userName;

    @NotBlank(message = "Password is required")
    private String password;
}
