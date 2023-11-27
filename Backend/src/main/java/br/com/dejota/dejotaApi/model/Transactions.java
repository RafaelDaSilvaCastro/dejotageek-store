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

    @Enumerated(EnumType.STRING)
    @Column(name = "transaction_type")
    private TransactionsType type;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Double price;

    @Column(name = "datetime")
    private LocalDateTime datetime;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public Transactions(TransactionsType type, Integer quantity, Double price) {
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.datetime = LocalDateTime.now();
    }
}