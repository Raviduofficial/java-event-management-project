package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.event.EventCreateDTO;
import com.neoarkbyte.rutech.dto.event.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import com.neoarkbyte.rutech.entity.PermissionLetter;
import com.neoarkbyte.rutech.entity.Venue;
import com.neoarkbyte.rutech.mapper.EventMapper;
import com.neoarkbyte.rutech.repository.EventRepository;
import com.neoarkbyte.rutech.repository.LetterRepository;
import com.neoarkbyte.rutech.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;
    private final LetterRepository letterRepository; // Added
    private final EventMapper eventMapper;

    @Transactional
    public EventResponseDTO createEvent(EventCreateDTO createDTO) {
        Event event = eventMapper.toEntity(createDTO);

        if (createDTO.getVenueId() != null) {
            Venue venue = venueRepository.findById(createDTO.getVenueId())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + createDTO.getVenueId()));
            event.setVenue(venue);
        }

        if (createDTO.getLetterIds() != null && !createDTO.getLetterIds().isEmpty()) {
            List<PermissionLetter> permissions = letterRepository.findAllById(createDTO.getLetterIds());
            event.setPermissions(permissions);
        }

        Event savedEvent = eventRepository.save(event);
        return eventMapper.toResponseDTO(savedEvent);
    }

    public EventResponseDTO getEventById(String id) {
        return eventRepository.findById(id)
                .map(eventMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));
    }

    public List<EventResponseDTO> getAllEvents() {
        return eventMapper.toResponseDTOs(eventRepository.findAll());
    }

    @Transactional
    public EventResponseDTO updateEvent(String id, EventCreateDTO updateDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        existingEvent.setBudgetReport(updateDTO.getBudgetReport());
        existingEvent.setSponsorships(updateDTO.getSponsorships());
        existingEvent.setMarketing(updateDTO.getMarketing());
        existingEvent.setCommittee(updateDTO.getCommittee());

        existingEvent.setStartTime(updateDTO.getStartTime());
        existingEvent.setEndTime(updateDTO.getEndTime());

        if (updateDTO.getVenueId() != null) {
            Venue venue = venueRepository.findById(updateDTO.getVenueId())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + updateDTO.getVenueId()));
            existingEvent.setVenue(venue);
        }

        if (updateDTO.getLetterIds() != null) {
            List<PermissionLetter> permissions = letterRepository.findAllById(updateDTO.getLetterIds());
            existingEvent.setPermissions(permissions);
        }

        Event updatedEvent = eventRepository.save(existingEvent);
        return eventMapper.toResponseDTO(updatedEvent);
    }

    public void deleteEvent(String id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}