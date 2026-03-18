package com.neoarkbyte.rutech.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "lecturers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lecturer {

    @Id
    private String userId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String department;

    private String specialization;
}