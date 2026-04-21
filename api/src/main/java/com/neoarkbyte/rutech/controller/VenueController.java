package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.dto.venue.VenueCreateDTO;
import com.neoarkbyte.rutech.dto.venue.VenueResponseDTO;
import com.neoarkbyte.rutech.service.impl.VenueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
@RequiredArgsConstructor
public class VenueController {

    private final VenueService venueService;

    @PostMapping
    public ResponseEntity<ApiResponse<VenueResponseDTO>> createVenue(@Valid @RequestBody VenueCreateDTO createDTO) {
        VenueResponseDTO response = venueService.createVenue(createDTO);
        return ResponseEntity.ok(ResponseUtil.success("Venue created successfully", response, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VenueResponseDTO>> getVenueById(@PathVariable String id) {
        VenueResponseDTO response = venueService.getVenueById(id);
        return ResponseEntity.ok(ResponseUtil.success("Venue retrieved successfully", response, null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<VenueResponseDTO>>> getAllVenues() {
        List<VenueResponseDTO> response = venueService.getAllVenues();
        return ResponseEntity.ok(ResponseUtil.success("Venues retrieved successfully", response, null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VenueResponseDTO>> updateVenue(@PathVariable String id, @Valid @RequestBody VenueCreateDTO updateDTO) {
        VenueResponseDTO response = venueService.updateVenue(id, updateDTO);
        return ResponseEntity.ok(ResponseUtil.success("Venue updated successfully", response, null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVenue(@PathVariable String id) {
        venueService.deleteVenue(id);
        return ResponseEntity.ok(ResponseUtil.success("Venue deleted successfully", null, null));
    }
}
