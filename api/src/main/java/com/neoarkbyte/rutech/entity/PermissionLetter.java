package com.neoarkbyte.rutech.entity;

import com.neoarkbyte.rutech.util.Utils;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permission_letters")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionLetter{
    @Id
    private String letter_id = Utils.generateId("PL", 6);

    private String letter_title;

    private String letter_description;

    private String letter_url;

    private Boolean is_verified;
}
