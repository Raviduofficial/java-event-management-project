package com.neoarkbyte.rutech.dto.auth;

import com.neoarkbyte.rutech.type.ROLE;
import lombok.Data;

import java.util.Map;

@Data
public class UserCreateDTO {

    private String userName;
    private String name;
    private String email;
    private String password;
    private String telephone;
    private String address;
    private ROLE role;

    // Lecturer
    private String department;
    private String specialization;

    // BatchRep
    private String batchName;
    private Integer year;

    // Organization
    private Map<String, Object> committee;
    private String mission;
    private String vision;
    private String history;
    private String orgUrl;
}
