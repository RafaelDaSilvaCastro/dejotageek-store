package br.com.dejota.dejotaApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "ProductImages")
public class ProductImages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String key;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public ProductImages(String name, String key, Product product) {
        this.name = name;
        this.key = key;
        this.product = product;
    }
}
