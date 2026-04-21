package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.letter.LetterCreateDTO;
import com.neoarkbyte.rutech.dto.letter.LetterResponseDTO;
import com.neoarkbyte.rutech.entity.PermissionLetter;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface LetterMapper {

    @Mapping(target = "letterId", ignore = true)
    @Mapping(target = "event", ignore = true)
    PermissionLetter toEntity(LetterCreateDTO letterCreateDTO);

    LetterResponseDTO toResponseDTO(PermissionLetter permissionLetter);

    List<LetterResponseDTO> toResponseDTOs(List<PermissionLetter> permissionLetters);

    void updateEntityFromDto(LetterCreateDTO dto, @MappingTarget PermissionLetter entity);

}
