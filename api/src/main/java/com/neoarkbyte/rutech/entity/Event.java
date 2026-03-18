package com.neoarkbyte.rutech.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.neoarkbyte.rutech.util.Utils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    private String event_id;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> budget_report;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> sponsorships;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> marketing;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> committee;

    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id")
    private List<PermissionLetter> permissions;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start_time;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime end_time;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime created_at;

    @UpdateTimestamp
    private LocalDateTime updated_at;

    @PrePersist
    public void generateId() {
        if (event_id == null) {
            event_id = Utils.generateId("EVENT", 6);
        }
    }
}