package org.example.logitrackback.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.logitrackback.enums.StatutCommande;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "commandes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_commande", nullable = false)
    private LocalDateTime dateCommande;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCommande statut;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<LigneCommande> lignesCommande = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        if (dateCommande == null) {
            dateCommande = LocalDateTime.now();
        }
        if (statut == null) {
            statut = StatutCommande.EN_ATTENTE;
        }
    }
}
