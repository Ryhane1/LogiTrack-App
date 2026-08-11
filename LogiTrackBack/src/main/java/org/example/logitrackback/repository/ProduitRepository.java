package org.example.logitrackback.repository;

import org.example.logitrackback.entity.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {


    Page<Produit> findByCategorieIgnoreCase(String categorie, Pageable pageable);



    Page<Produit> findByPrixLessThan(BigDecimal prix, Pageable pageable);



    @Query("SELECT p FROM Produit p WHERE p.quantiteStock < :seuil ORDER BY p.quantiteStock ASC")
    Page<Produit> findLowStockProducts(@Param("seuil") int seuil, Pageable pageable);


}
