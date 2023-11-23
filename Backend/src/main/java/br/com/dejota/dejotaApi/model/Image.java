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
@Table(name = "Images")
public class Image extends EntityId {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String key;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Image(String name, String key) {
        this.name = name;
        this.key = key;
    }
}
