package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.event.EventCreateDTO;
import com.neoarkbyte.rutech.dto.event.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EventMapper {

    @Mapping(target = "event_id", ignore = true)
    @Mapping(target = "venue", ignore = true)
    @Mapping(target = "permissions", ignore = true)
    Event toEntity(EventCreateDTO eventCreateDTO);

    EventResponseDTO toResponseDTO(Event event);

    List<EventResponseDTO> toResponseDTOs(List<Event> events);
}