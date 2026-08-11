package org.example.logitrackback.controller;

import lombok.RequiredArgsConstructor;
import org.example.logitrackback.service.CommandeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final CommandeService commandeService;

    @GetMapping("/topProduct")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Object> getTopProduct() {
        return ResponseEntity.ok(commandeService.getTopProduct());
    }
}