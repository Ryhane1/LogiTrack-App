package org.example.logitrackback.Mappers;

import org.example.logitrackback.DTOs.UserAppDTO;
import org.example.logitrackback.entity.UserApp;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserAppMapper {
    UserAppDTO toDTO(UserApp userApp);
    UserApp toEntity(UserAppDTO userAppDTO);

}
