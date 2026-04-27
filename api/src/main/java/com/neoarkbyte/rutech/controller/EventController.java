package com.neoarkbyte.rutech.controller;

import com.neoarkbyte.rutech.dto.ApiResponse;
import com.neoarkbyte.rutech.dto.ResponseUtil;
import com.neoarkbyte.rutech.dto.event.EventCreateDTO;
import com.neoarkbyte.rutech.dto.event.EventResponseDTO;
import com.neoarkbyte.rutech.dto.event.RejectRequestDTO;
import com.neoarkbyte.rutech.service.impl.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    public ResponseEntity<ApiResponse<EventResponseDTO>> createEvent(@Valid @RequestBody EventCreateDTO createDTO) {
        EventResponseDTO response = eventService.createEvent(createDTO);
        return ResponseEntity.ok(ResponseUtil.success("Event created successfully", response, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponseDTO>> getEventById(@PathVariable String id) {
        EventResponseDTO response = eventService.getEventById(id);
        return ResponseEntity.ok(ResponseUtil.success("Event retrieved successfully", response, null));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<EventResponseDTO>>> getAllEvents() {
        List<EventResponseDTO> response = eventService.getAllEvents();
        return ResponseEntity.ok(ResponseUtil.success("Events retrieved successfully", response, null));
    }

    @GetMapping("/coordinator/{coordinatorId}")
    public ResponseEntity<ApiResponse<List<EventResponseDTO>>> getEventsByCoordinatorId(@PathVariable String coordinatorId) {
        List<EventResponseDTO> response = eventService.getEventsByCoordinatorId(coordinatorId);
        return ResponseEntity.ok(ResponseUtil.success("Coordinator events retrieved successfully", response, null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EventResponseDTO>> updateEvent(@PathVariable String id, @Valid @RequestBody EventCreateDTO updateDTO) {
        EventResponseDTO response = eventService.updateEvent(id, updateDTO);
        return ResponseEntity.ok(ResponseUtil.success("Event updated successfully", response, null));
    }

    @PatchMapping("/{id}/approved")
    public ResponseEntity<ApiResponse<EventResponseDTO>> approveEvent(@PathVariable String id) {
        EventResponseDTO response = eventService.approveEvent(id);
        return ResponseEntity.ok(ResponseUtil.success("Event approved successfully", response, null));
    }

    @PatchMapping("/{id}/rejected")
    public ResponseEntity<ApiResponse<EventResponseDTO>> rejectEvent(@PathVariable String id, @RequestBody RejectRequestDTO rejectDTO) {
        EventResponseDTO response = eventService.rejectEvent(id, rejectDTO.getMessage());
        return ResponseEntity.ok(ResponseUtil.success("Event rejected successfully", response, null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(ResponseUtil.success("Event deleted successfully", null, null));
    }
}
