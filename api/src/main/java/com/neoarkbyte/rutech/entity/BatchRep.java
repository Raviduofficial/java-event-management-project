package com.neoarkbyte.rutech.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "batch_reps")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BatchRep {

    @Id
    private String rep_id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String name;

    private String batch_name;

    private Integer year;
}