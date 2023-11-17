package br.com.dejota.dejotaApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "ProductImages")
public class ProductImages extends EntityId {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String key;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
