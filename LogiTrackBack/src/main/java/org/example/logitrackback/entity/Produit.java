package org.example.logitrackback.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "produits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom du produit est obligatoire")
    @Column(nullable = false)
    private String nom;

    @NotBlank(message = "La catégorie est obligatoire")
    @Column(nullable = false)
    private String categorie;

    @NotNull(message = "Le prix est obligatoire")
    @Min(value = 0, message = "Le prix ne peut pas être négatif")
    @Column(nullable = false, precision = 10, scale = 2)
    @Positive
    private BigDecimal prix;

    @Min(value = 0, message = "La quantité en stock ne peut pas être négative")
    @Column(name = "quantite_stock", nullable = false)
    private Integer quantiteStock;
}
