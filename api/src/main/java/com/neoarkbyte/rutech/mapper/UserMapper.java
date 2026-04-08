package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.auth.UserCreateDTO;
import com.neoarkbyte.rutech.entity.BatchRep;
import com.neoarkbyte.rutech.entity.Lecturer;
import com.neoarkbyte.rutech.entity.Organization;
import org.mapstruct.*;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "userName", source = "userName")
    void updateUserFromDto(UserCreateDTO dto, @MappingTarget Lecturer user);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "userName", source = "userName")
    void updateUserFromDto(UserCreateDTO dto, @MappingTarget BatchRep user);

    @Mapping(target = "userId", ignore = true)
    @Mapping(target = "userName", source = "userName")
    @Mapping(target = "committee", source = "committee", qualifiedByName = "mapDictionary")
    void updateUserFromDto(UserCreateDTO dto, @MappingTarget Organization user);


    @Named("mapDictionary")
    default <K, V> Map<K, V> mapDictionary(Map<K, V> map) {
        return map;
    }
}