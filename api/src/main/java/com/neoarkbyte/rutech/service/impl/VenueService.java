package com.neoarkbyte.rutech.service.impl;

import com.neoarkbyte.rutech.dto.venue.VenueCreateDTO;
import com.neoarkbyte.rutech.dto.venue.VenueResponseDTO;
import com.neoarkbyte.rutech.entity.Venue;
import com.neoarkbyte.rutech.mapper.VenueMapper;
import com.neoarkbyte.rutech.repository.VenueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VenueService {

    private final VenueRepository venueRepository;
    private final VenueMapper venueMapper;

    @Transactional
    public VenueResponseDTO createVenue(VenueCreateDTO createDTO) {
        Venue venue = venueMapper.toEntity(createDTO);
        Venue savedVenue = venueRepository.save(venue);
        return venueMapper.toResponseDTO(savedVenue);
    }

    public VenueResponseDTO getVenueById(String id) {
        return venueRepository.findById(id)
                .map(venueMapper::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));
    }

    public List<VenueResponseDTO> getAllVenues() {
        return venueMapper.toResponseDTOs(venueRepository.findAll());
    }

    @Transactional
    public VenueResponseDTO updateVenue(String id, VenueCreateDTO updateDTO) {
        Venue existingVenue = venueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue not found with id: " + id));

        venueMapper.updateEntityFromDto(updateDTO, existingVenue);

        return venueMapper.toResponseDTO(existingVenue);
    }

    public void deleteVenue(String id) {
        if (!venueRepository.existsById(id)) {
            throw new RuntimeException("Venue not found with id: " + id);
        }
        venueRepository.deleteById(id);
    }
}
