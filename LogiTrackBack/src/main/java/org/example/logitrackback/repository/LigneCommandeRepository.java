package org.example.logitrackback.repository;

import org.example.logitrackback.entity.LigneCommande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LigneCommandeRepository extends JpaRepository<LigneCommande, Long> {

    @Query("SELECT lc.produit FROM LigneCommande lc " +
           "GROUP BY lc.produit " +
           "ORDER BY SUM(lc.quantite) DESC " +
           "LIMIT 1")
    Optional<Object> findTopProduct();
}
