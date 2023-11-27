package br.com.dejota.dejotaApi.dtos;

import java.time.LocalDate;

public record ReadProductDto(
        Long id,
        String name,
        String description,
        Double price,
        Double purchasePrice,
        Integer stock,
        String image,
        String category,
        LocalDate createdAt
) {
}
