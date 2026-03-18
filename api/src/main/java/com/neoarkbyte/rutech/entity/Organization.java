package com.neoarkbyte.rutech.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
@Table(name = "organizations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Organization extends User {

    private String organizationType;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> committee;
}