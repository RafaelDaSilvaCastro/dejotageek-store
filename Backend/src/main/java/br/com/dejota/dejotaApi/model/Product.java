package br.com.dejota.dejotaApi.model;

import br.com.dejota.dejotaApi.enums.ProductCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Products")
public class Product extends EntityId {

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "purchasePrice")
    private Double purchasePrice;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "category")
    private ProductCategory category;

    @OneToMany
    @JoinColumn(name = "transaction_id")
    private List<Transactions> transactions = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ProductImages> images = new ArrayList<>();

    public Product(String name, String description, Double price, Double purchasePrice, Integer stock, ProductCategory category) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.purchasePrice = purchasePrice;
        this.stock = stock;
        this.category = category;
    }
}
