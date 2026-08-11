package org.example.logitrackback.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.Commande;
import org.example.logitrackback.entity.LigneCommande;
import org.example.logitrackback.enums.StatutCommande;
import org.example.logitrackback.service.CommandeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class CommandeController {

    private final CommandeService commandeService;

    public record CreerCommandeRequest(
            @NotNull(message = "Le clientId est obligatoire")
            Long clientId
    ) {}

    public record AjouterProduitRequest(
            @NotNull(message = "Le produitId est obligatoire")
            Long produitId,

            @NotNull(message = "La quantité est obligatoire")
            @Min(value = 1, message = "La quantité doit être supérieure à 0")
            Integer quantite
    ) {}

    public record ModifierStatutRequest(
            @NotNull(message = "Le statut est obligatoire")
            StatutCommande statut
    ) {}


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Commande> creerCommande(
            @Valid @RequestBody CreerCommandeRequest request) {

        Commande commande = commandeService.creerCommande(request.clientId());

        return ResponseEntity.status(HttpStatus.CREATED).body(commande);
    }


    @PostMapping("/{orderId}/products")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<LigneCommande> ajouterProduit(
            @PathVariable Long orderId,
            @Valid @RequestBody AjouterProduitRequest request) {

        LigneCommande ligne = commandeService.ajouterProduitACommande(
                orderId,
                request.produitId(),
                request.quantite());

        return ResponseEntity.status(HttpStatus.CREATED).body(ligne);
    }



    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Commande> getCommandeById(@PathVariable Long id) {
        return ResponseEntity.ok(commandeService.getCommandeById(id));
    }


    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Commande> modifierStatut(
            @PathVariable Long id,
            @Valid @RequestBody ModifierStatutRequest request) {

        Commande commande = commandeService.modifierStatut(
                id,
                request.statut());

        return ResponseEntity.ok(commande);
    }


    @GetMapping("/client/{clientId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<List<Commande>> getCommandesByClient(
            @PathVariable Long clientId) {

        return ResponseEntity.ok(
                commandeService.getCommandesByClient(clientId));
    }


    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Map<String, Long>> countCommandes() {

        return ResponseEntity.ok(
                Map.of("totalCommandes",
                        commandeService.countCommandes()));
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Page<Commande>> getAllCommandes(
            @RequestParam(required = false) Long clientId,
            @RequestParam(required = false) StatutCommande statut,
            Pageable pageable) {

        return ResponseEntity.ok(
                commandeService.getAllCommandes(
                        clientId,
                        statut,
                        pageable
                )
        );
    }


}