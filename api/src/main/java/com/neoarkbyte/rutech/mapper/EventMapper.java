package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.event.EventCreateDTO;
import com.neoarkbyte.rutech.dto.event.EventResponseDTO;
import com.neoarkbyte.rutech.entity.Event;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = LetterMapper.class)
public interface EventMapper {

    @Mapping(target = "eventId", ignore = true)
    @Mapping(target = "venue", ignore = true)
    @Mapping(target = "coordinator", ignore = true)
    Event toEntity(EventCreateDTO eventCreateDTO);

    @Mapping(target = "coordinator.password", ignore = true)
    EventResponseDTO toResponseDTO(Event event);

    List<EventResponseDTO> toResponseDTOs(List<Event> events);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "venue", ignore = true)
    void updateEntityFromDto(EventCreateDTO dto, @MappingTarget Event entity);
}