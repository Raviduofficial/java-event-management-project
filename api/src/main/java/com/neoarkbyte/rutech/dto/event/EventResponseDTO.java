package com.neoarkbyte.rutech.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.neoarkbyte.rutech.entity.PermissionLetter;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.entity.Venue;
import com.neoarkbyte.rutech.type.STATUS;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class EventResponseDTO {

    private String eventId;

    private String title;
    private String about;
    private String eventUrl;
    private String agendaUrl;

    private Map<String, Object> budgetReport;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;

    private User coordinator;

    private Venue venue;

    private List<PermissionLetter> permissionLetters;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    private STATUS status;
}