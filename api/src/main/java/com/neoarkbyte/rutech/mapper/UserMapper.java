package com.neoarkbyte.rutech.mapper;

import com.neoarkbyte.rutech.dto.auth.*;
import com.neoarkbyte.rutech.entity.BatchRep;
import com.neoarkbyte.rutech.entity.Lecturer;
import com.neoarkbyte.rutech.entity.Organization;
import com.neoarkbyte.rutech.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

import java.util.List;
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

    UserResponseDTO toResponseDTO(User user);
    List<UserResponseDTO> toResponseDTOs(List<User> users);

    BatchRepResponseDTO toBatchRepResponseDTO(BatchRep rep);
    List<BatchRepResponseDTO> toBatchRepResponseDTOs(List<BatchRep> reps);

    OrgResponseDTO toOrgResponseDTO(Organization org);
    List<OrgResponseDTO> toOrgResponseDTOs(List<Organization> orgs);

    LecResponseDTO toLecResponseDTO(Lecturer lec);
    List<LecResponseDTO> toLecResponseDTOs(List<Lecturer> lecs);

}