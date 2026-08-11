package org.example.logitrackback.service;

import org.example.logitrackback.entity.Client;
import org.example.logitrackback.entity.LigneCommande;
import org.example.logitrackback.entity.Produit;
import org.example.logitrackback.enums.StatutCommande;
import org.example.logitrackback.exception.ResourceNotFoundException;
import org.example.logitrackback.repository.CommandeRepository;
import org.example.logitrackback.repository.LigneCommandeRepository;
import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.Commande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final LigneCommandeRepository ligneCommandeRepository;
    private final ClientService clientService;
    private final ProduitService produitService;

    /**
     * Crée une nouvelle commande pour un client existant.
     * Le body JSON doit contenir : { "clientId": 1 }
     */
    public Commande creerCommande(Long clientId) {
        Client client = clientService.getClientById(clientId);
        Commande commande = Commande.builder()
                .client(client)
                .statut(StatutCommande.EN_ATTENTE)
                .build();
        return commandeRepository.save(commande);
    }

    /**
     * Ajoute un produit (ligne de commande) à une commande existante.
     * Le body JSON doit contenir : { "produitId": 2, "quantite": 5 }
     */
    public LigneCommande ajouterProduitACommande(Long commandeId, Long produitId, Integer quantite) {
        Commande commande = getCommandeById(commandeId);
        Produit produit = produitService.getProduitById(produitId);

        LigneCommande ligne = LigneCommande.builder()
                .commande(commande)
                .produit(produit)
                .quantite(quantite)
                .build();

        return ligneCommandeRepository.save(ligne);
    }

    @Transactional(readOnly = true)
    public Page<Commande> getAllCommandes(Pageable pageable) {
        return commandeRepository.findAll(pageable);
    }

    public Page<Commande> getAllCommandes(
            Long clientId,
            StatutCommande statut,
            Pageable pageable) {

        return commandeRepository.findByFilters(
                clientId,
                statut,
                pageable
        );
    }


    @Transactional(readOnly = true)
    public Commande getCommandeById(Long id) {
        return commandeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Commande", id));
    }

    public Commande modifierStatut(Long id, StatutCommande nouveauStatut) {
        Commande commande = getCommandeById(id);
        commande.setStatut(nouveauStatut);
        return commandeRepository.save(commande);
    }

    // ── Derived Query ──────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<Commande> getCommandesByClient(Long clientId) {
        // Vérification que le client existe
        clientService.getClientById(clientId);
        return commandeRepository.findByClientId(clientId);
    }

    // ── @Query ─────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public long countCommandes() {
        return commandeRepository.countTotalCommandes();
    }

    @Transactional(readOnly = true)
    public Object getTopProduct() {
        return ligneCommandeRepository.findTopProduct()
                .orElseThrow(() -> new ResourceNotFoundException("Aucune commande enregistrée pour calculer le top produit."));
    }
}
