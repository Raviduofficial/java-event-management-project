package com.neoarkbyte.rutech.dto;

import com.neoarkbyte.rutech.entity.Venue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventResponseDTO {

    private String event_id;

    private Map<String, Object> budgetReport;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;

    private Venue venue;

    private boolean budgetReportVerified;
    private boolean sponsorshipsVerified;
    private boolean marketingVerified;
    private boolean committeeVerified;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}