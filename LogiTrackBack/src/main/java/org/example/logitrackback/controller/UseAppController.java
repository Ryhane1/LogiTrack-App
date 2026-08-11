package org.example.logitrackback.controller;

import lombok.RequiredArgsConstructor;
import org.example.logitrackback.DTOs.UserAppDTO;
import org.example.logitrackback.service.UserAppService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UseAppController {

    private final UserAppService userAppService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserAppDTO> ajouterUser
            (@RequestBody UserAppDTO userAppDTO ){
        UserAppDTO userAppDTO1 = userAppService.AjouterUser(userAppDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userAppDTO1);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserAppDTO> modifierUser (@RequestBody UserAppDTO userAppDTO ,
                                                    @PathVariable Long id){
        UserAppDTO userAppDTO1 = userAppService.editUser(id, userAppDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(userAppDTO1);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> supprimerUser (@RequestParam Long id){
        userAppService.SupprimerUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<UserAppDTO>> lisiterUsers (Pageable pageable){
        Page<UserAppDTO> dtoList = userAppService.listerUsers(pageable);
        return ResponseEntity.ok().body(dtoList);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserAppDTO> consulterUser (@PathVariable Long id){
        return ResponseEntity.ok().body(userAppService.consulterUser(id));
    }

    @GetMapping("/me")
    public ResponseEntity<UserAppDTO> consulterUserConnecte(@RequestParam String nom){
        return ResponseEntity.ok().body(userAppService.consulterUserByUsername(nom));
    }

}
