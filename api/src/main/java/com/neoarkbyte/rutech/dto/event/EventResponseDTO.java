package com.neoarkbyte.rutech.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.neoarkbyte.rutech.entity.PermissionLetter;
import com.neoarkbyte.rutech.entity.Venue;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class EventResponseDTO {

    private String event_id;

    private Map<String, Object> budget_report;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;

    private Venue venue;
    private List<PermissionLetter> permissions;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start_time;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime end_time;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime created_at;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updated_at;
}