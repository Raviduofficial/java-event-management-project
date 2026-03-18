package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.EventCreateDTO;
import com.neoarkbyte.rutech.dto.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface EventMapper {

    Event toEntity(EventCreateDTO eventCreateDTO);

    @Mapping(source = "event_id", target = "event_id")
    EventResponseDTO toResponseDTO(Event event);

    List<EventResponseDTO> toResponseDTOs(List<Event> events);
}

