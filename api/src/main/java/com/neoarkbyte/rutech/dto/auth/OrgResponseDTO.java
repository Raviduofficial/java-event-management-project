package com.neoarkbyte.rutech.dto.auth;

import com.neoarkbyte.rutech.type.ROLE;
import lombok.Data;
import java.util.Map;

@Data
public class OrgResponseDTO{
    private String userId;
    private String userName;
    private String name;
    private String email;
    private String telephone;
    private String address;
    private ROLE role;
    private Map<String, Object> committee;
    private String mission;
    private String vision;
    private String history;
    private String orgUrl;
}
