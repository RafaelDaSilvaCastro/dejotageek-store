package br.com.dejota.dejotaApi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Categories")
public class Category extends EntityId {

    private String name;

    private String description;

    private String categoriaPai;

    private LocalDate createdAt;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    public Category(String name, String description, String categoriaPai) {
        this.name = name;
        this.description = description;
        this.categoriaPai = categoriaPai;
        this.createdAt = LocalDate.now();
    }
}
