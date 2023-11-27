package br.com.dejota.dejotaApi.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Promotions")
public class Promotion extends EntityId{

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String description;

    private Double percentage;

    private LocalDate startDate;

    private LocalDate endDate;

    public Promotion(String description, Double percentage, LocalDate startDate, LocalDate endDate) {
        this.description = description;
        this.percentage = percentage;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
