package org.example.logitrackback.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.Client;
import org.example.logitrackback.service.ClientService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Client> creerClient(@Valid @RequestBody Client client) {
        Client nouveau = clientService.creerClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(nouveau);
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Page<Client>> getAllClients(Pageable pageable) {
        return ResponseEntity.ok(clientService.getAllClients(pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> supprimerClient(@PathVariable Long id) {
        clientService.supprimerClient(id);
        return ResponseEntity.noContent().build();
    }
}