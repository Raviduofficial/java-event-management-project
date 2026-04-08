package com.neoarkbyte.rutech.entity;

import com.neoarkbyte.rutech.util.Utils;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
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
    private String letterId;

    private String letterTitle;

    private String letterDescription;

    private String letterUrl;

    private Boolean isVerified;

    @PrePersist
    public void generateId() {
        if (letterId == null) {
            letterId = Utils.generateId("PL", 6);
        }
    }
}
