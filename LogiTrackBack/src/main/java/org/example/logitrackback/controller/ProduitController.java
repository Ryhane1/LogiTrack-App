package org.example.logitrackback.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.Produit;
import org.example.logitrackback.service.ProduitService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProduitController {

    private final ProduitService produitService;


    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Produit> creerProduit(@Valid @RequestBody Produit produit) {

        Produit nouveau = produitService.creerProduit(produit);

        return ResponseEntity.status(HttpStatus.CREATED).body(nouveau);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Produit> mettreAJourProduit(@PathVariable Long id, @Valid @RequestBody Produit produit) {

        Produit misAJour = produitService.mettreAJourProduit(id, produit);

        return ResponseEntity.status(HttpStatus.CREATED).body(misAJour);
    }


    @GetMapping("/lowStock")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<Page<Produit>> getStockFaible(Pageable pageable) {

        return ResponseEntity.ok(
                produitService.getProduitsStockFaible(pageable));
    }


    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Page<Produit>> getAllProduits(Pageable pageable) {

        return ResponseEntity.ok(produitService.getAllProduits(pageable));
    }


    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {

        return ResponseEntity.ok(produitService.getProduitById(id));
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> supprimerProduit(@PathVariable Long id) {

        produitService.supprimerProduit(id);

        return ResponseEntity.noContent().build();
    }


    @GetMapping("/category/{category}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Page<Produit>> getByCategorie(
            @PathVariable String category , Pageable pageable) {

        return ResponseEntity.ok(
                produitService.getProduitsByCategorie(category , pageable));
    }


    @GetMapping("/price/{price}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','AGENT')")
    public ResponseEntity<Page<Produit>> getByPrixMax(
            @PathVariable BigDecimal price , Pageable pageable) {

        return ResponseEntity.ok(
                produitService.getProduitsByPrixMax(price , pageable));
    }


}