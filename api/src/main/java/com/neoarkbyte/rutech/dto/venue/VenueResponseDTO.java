package com.neoarkbyte.rutech.dto.venue;

import lombok.Data;
import java.util.List;

@Data
public class VenueResponseDTO {
    private String venueId;
    private String name;
    private String location;
    private String description;
    private int capacity;
    private boolean isBooked;
    private String venueUrl;
    private List<String> facilities;
}
