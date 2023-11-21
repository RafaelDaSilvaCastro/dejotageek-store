package br.com.dejota.dejotaApi.model;

import br.com.dejota.dejotaApi.enums.TransactionsType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Transactions")
public class Transactions extends EntityId {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_type")
    private TransactionsType type;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "sale_price")
    private Float salePrice;

    @Column(name = "purchase_price")
    private Float purchasePrice;

    @Column(name = "datetime", columnDefinition = "TIMESTAMP DEFAULT now()")
    private Instant datetime;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
