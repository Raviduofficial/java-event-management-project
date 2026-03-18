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
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String user_id;

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
        if (user_id == null && role != null) {
            switch (role) {
                case ADMIN_LEC -> user_id = Utils.generateId("LEC", 6);
                case BATCH_REP -> user_id = Utils.generateId("REP", 6);
                case ORGANIZATION -> user_id = Utils.generateId("ORG", 6);
                default -> user_id = Utils.generateId("LEC", 6); // fallback
            }
        }
    }
}