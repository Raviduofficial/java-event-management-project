package com.neoarkbyte.rutech.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class EventCreateDTO {
    private String title;
    private String about;
    private String eventUrl;
    private String agendaUrl;
    private Map<String, Object> budgetReport;
    private Map<String, Object> sponsorships;
    private Map<String, Object> committee;
    private String venueId;
    private String coordinatorId;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

}
