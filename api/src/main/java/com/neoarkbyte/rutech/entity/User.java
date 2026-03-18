package com.neoarkbyte.rutech.entity;

import com.neoarkbyte.rutech.util.Utils;
import com.neoarkbyte.rutech.type.ROLE;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String userId;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email;

    private String telephone;

    private String address;

    @Enumerated(EnumType.STRING)
    private ROLE role;

    @PrePersist
    public void generateId() {
        if (userId == null && role != null) {
            switch (role) {
                case ADMIN_LEC -> userId = Utils.generateId("LEC", 6);
                case BATCH_REP -> userId = Utils.generateId("REP", 6);
                case ORGANIZATION -> userId = Utils.generateId("ORG", 6);
                default -> userId = Utils.generateId("LEC", 6); // fallback
            }
        }
    }
}