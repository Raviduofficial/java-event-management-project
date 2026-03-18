package com.neoarkbyte.rutech.dto;

import com.neoarkbyte.rutech.entity.Venue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventCreateDTO {
    private Map<String, Object> budgetReport;
    private Map<String, Object> sponsorships;
    private Map<String, Object> marketing;
    private Map<String, Object> committee;

    private Venue venue;

    private boolean isBudgetReportVerified;
    private boolean isSponsorshipsVerified;
    private boolean isMarketingVerified;
    private boolean isCommitteeVerified;
}
