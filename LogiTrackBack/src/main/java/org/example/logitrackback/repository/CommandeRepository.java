package org.example.logitrackback.repository;

import org.example.logitrackback.entity.Commande;
import org.example.logitrackback.enums.StatutCommande;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {


    List<Commande> findByClientId(Long clientId);

    @Query("SELECT COUNT(c) FROM Commande c")
    long countTotalCommandes();

    @Query("""
    SELECT c
    FROM Commande c
    WHERE (:clientId IS NULL OR c.client.id = :clientId)
    AND (:statut IS NULL OR c.statut = :statut)
    """)
    Page<Commande> findByFilters(
            @Param("clientId") Long clientId,
            @Param("statut") StatutCommande statut,
            Pageable pageable
    );
}
