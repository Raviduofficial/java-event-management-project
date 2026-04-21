package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.venue.VenueCreateDTO;
import com.neoarkbyte.rutech.dto.venue.VenueResponseDTO;
import com.neoarkbyte.rutech.entity.Venue;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface VenueMapper {

    @Mapping(target = "venueId", ignore = true)
    Venue toEntity(VenueCreateDTO venueCreateDTO);

    VenueResponseDTO toResponseDTO(Venue venue);

    List<VenueResponseDTO> toResponseDTOs(List<Venue> venues);

    void updateEntityFromDto(VenueCreateDTO dto, @MappingTarget Venue entity);

}
