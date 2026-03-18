package com.neoarkbyte.rutech.dto.event;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventCreateDTO {
    private Map<String, Object> budget_report;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;
    private String venue_id;
    private List<String> letter_ids;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime start_time;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime end_time;

}
