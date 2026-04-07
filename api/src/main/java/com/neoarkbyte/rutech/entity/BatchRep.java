package com.neoarkbyte.rutech.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "batch_reps")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BatchRep extends User{

    private String batch_name;

    private Integer year;
}