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
@Table(name = "venues")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Venue {
    @Id
    private String venueId;

    private String name;

    private String location;

    private String description;

    private boolean isBooked;

    @PrePersist
    public void generateId() {
        if (venueId == null) {
            venueId = Utils.generateId("VEN", 6);;
        }
    }
}
