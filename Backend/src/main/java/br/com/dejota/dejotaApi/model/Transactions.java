package br.com.dejota.dejotaApi.model;

import br.com.dejota.dejotaApi.enums.TransactionsType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Transactions")
public class Transactions extends EntityId {

    @Column(name = "transaction_type")
    private TransactionsType type;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "sale_price")
    private Float salePrice;

    @Column(name = "purchase_price")
    private Float purchasePrice;

    @Column(name = "datetime")
    private LocalDateTime datetime;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Transactions(TransactionsType type, Integer quantity, Float salePrice, Float purchasePrice) {
        this.type = type;
        this.quantity = quantity;
        this.salePrice = salePrice;
        this.purchasePrice = purchasePrice;
        this.datetime = LocalDateTime.now();
    }
}
