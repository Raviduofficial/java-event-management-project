package com.neoarkbyte.rutech.service;

import com.neoarkbyte.rutech.dto.EventCreateDTO;
import com.neoarkbyte.rutech.dto.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import com.neoarkbyte.rutech.entity.Venue;
import com.neoarkbyte.rutech.mapper.EventMapper;
import com.neoarkbyte.rutech.repository.EventRepository;
import com.neoarkbyte.rutech.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final VenueRepository venueRepository;
    private final EventMapper eventMapper;

    public EventResponseDTO createEvent(EventCreateDTO createDTO) {
        Event event = eventMapper.toEntity(createDTO);
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

    public EventResponseDTO updateEvent(String id, EventCreateDTO updateDTO) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + id));

        existingEvent.setBudgetReport(updateDTO.getBudgetReport());
        existingEvent.setSponsorships(updateDTO.getSponsorships());
        existingEvent.setMarketing(updateDTO.getMarketing());
        existingEvent.setCommittee(updateDTO.getCommittee());

        // Update venue if changed

        // Update venue if DTO has it
        if (updateDTO.getVenue() != null && updateDTO.getVenue().getVen_id() != null) {
            String venId = updateDTO.getVenue().getVen_id();
            Venue venue = venueRepository.findById(venId)
                    .orElseThrow(() -> new RuntimeException("Venue not found with id: " + venId));
            existingEvent.setVenue(venue);
        }

        existingEvent.setBudgetReportVerified(updateDTO.isBudgetReportVerified());
        existingEvent.setSponsorshipsVerified(updateDTO.isSponsorshipsVerified());
        existingEvent.setMarketingVerified(updateDTO.isMarketingVerified());
        existingEvent.setCommitteeVerified(updateDTO.isCommitteeVerified());

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
