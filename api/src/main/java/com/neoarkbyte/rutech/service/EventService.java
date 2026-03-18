package com.neoarkbyte.rutech.service;

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

        if (createDTO.getVenue_id() != null) {
            Venue venue = venueRepository.findById(createDTO.getVenue_id())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + createDTO.getVenue_id()));
            event.setVenue(venue);
        }

        if (createDTO.getLetter_ids() != null && !createDTO.getLetter_ids().isEmpty()) {
            List<PermissionLetter> permissions = letterRepository.findAllById(createDTO.getLetter_ids());
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

        existingEvent.setBudget_report(updateDTO.getBudget_report());
        existingEvent.setSponsorships(updateDTO.getSponsorships());
        existingEvent.setMarketing(updateDTO.getMarketing());
        existingEvent.setCommittee(updateDTO.getCommittee());

        existingEvent.setStart_time(updateDTO.getStart_time());
        existingEvent.setEnd_time(updateDTO.getEnd_time());

        if (updateDTO.getVenue_id() != null) {
            Venue venue = venueRepository.findById(updateDTO.getVenue_id())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + updateDTO.getVenue_id()));
            existingEvent.setVenue(venue);
        }

        if (updateDTO.getLetter_ids() != null) {
            List<PermissionLetter> permissions = letterRepository.findAllById(updateDTO.getLetter_ids());
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