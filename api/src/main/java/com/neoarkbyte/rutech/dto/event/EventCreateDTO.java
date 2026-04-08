package com.neoarkbyte.rutech.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
public class EventCreateDTO {
    private Map<String, Object> budgetReport;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;
    private String venueId;
    private List<String> letterIds;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime endTime;

}
