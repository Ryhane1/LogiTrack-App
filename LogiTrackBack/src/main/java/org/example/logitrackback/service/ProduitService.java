package org.example.logitrackback.service;

import jakarta.validation.Valid;
import org.example.logitrackback.entity.Produit;
import org.example.logitrackback.exception.ResourceNotFoundException;
import org.example.logitrackback.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProduitService {

    private final ProduitRepository produitRepository;

    // Seuil de stock faible (peut être externalisé dans application.properties)
    private static final int SEUIL_STOCK_FAIBLE = 10;

    public Produit creerProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    @Transactional(readOnly = true)
    public Page<Produit> getAllProduits(Pageable pageable) {
        return produitRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Produit getProduitById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit", id));
    }

    public void supprimerProduit(Long id) {
        if (!produitRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produit", id);
        }
        produitRepository.deleteById(id);
    }

    // ── Derived Query ──────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Page<Produit> getProduitsByCategorie(String categorie , Pageable pageable) {
        return produitRepository.findByCategorieIgnoreCase(categorie , pageable);
    }

    @Transactional(readOnly = true)
    public Page<Produit> getProduitsByPrixMax(BigDecimal prixMax, Pageable pageable) {
        return produitRepository.findByPrixLessThan(prixMax , pageable);
    }


    @Transactional(readOnly = true)
    public Page<Produit> getProduitsStockFaible(Pageable pageable) {
        return produitRepository.findLowStockProducts(SEUIL_STOCK_FAIBLE, pageable);
    }

    public Produit mettreAJourProduit(Long id, @Valid Produit produit) {
        Produit produitExistant = getProduitById(id);
        produitExistant.setNom(produit.getNom());
        produitExistant.setCategorie(produit.getCategorie());
        produitExistant.setPrix(produit.getPrix());
        produitExistant.setQuantiteStock(produit.getQuantiteStock());
        return produitRepository.save(produitExistant);
    }
}
