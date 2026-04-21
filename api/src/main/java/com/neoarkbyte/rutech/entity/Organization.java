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

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> committee;

    private String mission;

    private String vision;

    private String history;

    private String orgUrl;
}