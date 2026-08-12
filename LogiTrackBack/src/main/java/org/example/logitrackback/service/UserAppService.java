package org.example.logitrackback.service;

import lombok.RequiredArgsConstructor;

import org.example.logitrackback.DTOs.UserAppDTO;
import org.example.logitrackback.Mappers.UserAppMapper;
import org.example.logitrackback.entity.UserApp;
import org.example.logitrackback.repository.UserAppRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserAppService {

    private final UserAppRepository userAppRepository;
    private final UserAppMapper userAppMapper;

    @CacheEvict(value = "users", allEntries = true)
    public UserAppDTO AjouterUser (UserAppDTO userAppDTO) {
        UserApp userApp =
                userAppMapper.toEntity(userAppDTO);
        return userAppMapper.toDTO(userAppRepository.save(userApp));
    }

    @CacheEvict(value = "users", allEntries = true)
    public UserAppDTO editUser (Long id , UserAppDTO userAppDTO){
        if(userAppRepository.findById(id).isPresent()){
            UserApp userApp = userAppMapper.toEntity(userAppDTO);
            userApp.setId(id);
            return userAppMapper.toDTO(userAppRepository.save(userApp));
        }else {
            return null;
        }
    }

    @CacheEvict(value = "users", allEntries = true)
    public void SupprimerUser( Long id){
        userAppRepository.deleteById(id);
    }

    @Cacheable(value = "users", key = "#pageable.pageNumber + '-' + #pageable.pageSize + '-' + #pageable.sort")
    public Page<UserAppDTO> listerUsers(Pageable pageable){
        Page<UserApp> userList = userAppRepository.findAll(pageable);
        return userList.map(userAppMapper::toDTO);
    }


    @Cacheable(value = "user", key = "#id")
    public UserAppDTO consulterUser (Long id){
        return userAppMapper.toDTO(userAppRepository.findById(id).get());
    }

    @Cacheable(value = "userByUsername", key = "#username")
    public UserAppDTO consulterUserByUsername(String username){
        return userAppMapper.toDTO(userAppRepository.findUserAppByNom(username));
    }

    public void bannirUser(Long id){
        UserApp user = userAppRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not Found")
        );
        user.setActive(false);
        userAppRepository.save(user);
    }

}
