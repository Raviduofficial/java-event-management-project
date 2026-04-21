package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.event.EventCreateDTO;
import com.neoarkbyte.rutech.dto.event.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import com.neoarkbyte.rutech.entity.User;
import com.neoarkbyte.rutech.entity.Venue;
import com.neoarkbyte.rutech.mapper.EventMapper;
import com.neoarkbyte.rutech.repository.EventRepository;
import com.neoarkbyte.rutech.repository.LetterRepository;
import com.neoarkbyte.rutech.repository.UserRepository;
import com.neoarkbyte.rutech.repository.VenueRepository;
import com.neoarkbyte.rutech.type.STATUS;
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
    private final UserRepository userRepository;
    private final EventMapper eventMapper;

    @Transactional
    public EventResponseDTO createEvent(EventCreateDTO createDTO) {
        Event event = eventMapper.toEntity(createDTO);

        if (createDTO.getVenueId() != null) {
            Venue venue = venueRepository.findById(createDTO.getVenueId())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + createDTO.getVenueId()));
            event.setVenue(venue);
        }

        if (createDTO.getCoordinatorId() != null) {
            User user = userRepository.findById(createDTO.getCoordinatorId())
                    .orElseThrow(() -> new RuntimeException("Coordinator not found: " + createDTO.getCoordinatorId()));
            event.setCoordinator(user);
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

    public List<EventResponseDTO> getEventsByCoordinatorId(String userId) {
        return eventMapper.toResponseDTOs(eventRepository.findByCoordinatorUserId(userId));
    }

    @Transactional
    public EventResponseDTO updateEvent(String id, EventCreateDTO updateDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        if (updateDTO.getVenueId() != null) {
            Venue venue = venueRepository.findById(updateDTO.getVenueId())
                    .orElseThrow(() -> new RuntimeException("Venue not found: " + updateDTO.getVenueId()));
            existingEvent.setVenue(venue);
        }

        eventMapper.updateEntityFromDto(updateDTO, existingEvent);

        return eventMapper.toResponseDTO(existingEvent);
    }

    @Transactional
    public EventResponseDTO approveEvent(String id) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        existingEvent.setStatus(STATUS.APPROVED);
        return eventMapper.toResponseDTO(existingEvent);
    }

    @Transactional
    public EventResponseDTO rejectEvent(String id) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        existingEvent.setStatus(STATUS.REJECTED);
        return eventMapper.toResponseDTO(existingEvent);
    }

    public void deleteEvent(String id) {
        if (!eventRepository.existsById(id)) {
            throw new RuntimeException("Event not found with id: " + id);
        }
        eventRepository.deleteById(id);
    }
}