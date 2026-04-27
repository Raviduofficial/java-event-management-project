package com.neoarkbyte.rutech.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.neoarkbyte.rutech.type.STATUS;
import com.neoarkbyte.rutech.util.Utils;
import jakarta.persistence.*;
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

    private STATUS status;

    private String rejectMessage;

    @ManyToOne
    @JoinColumn(name = "event_id", unique = false)
    @JsonBackReference
    private Event event;

    @PrePersist
    public void generateFields() {
        if (letterId == null) {
            letterId = Utils.generateId("PL", 6);
        }

        if (status == null) {
            status = STATUS.PENDING;
        }
    }
}
