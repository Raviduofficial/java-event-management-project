package com.neoarkbyte.rutech.entity;

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
    private Map<String, Object> budgetReport;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> sponsorships;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> marketing;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> committee;

    @ManyToOne
    @JoinColumn(name = "venue_id")
    private Venue venue;

    private boolean isBudgetReportVerified;
    private boolean isSponsorshipsVerified;
    private boolean isMarketingVerified;
    private boolean isCommitteeVerified;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @PrePersist
    public void generateId() {
        if (event_id == null) {
            event_id = Utils.generateId("EVENT", 6);;
        }
    }
}
