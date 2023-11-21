package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.ProductCategory;

public record ReadProductDto(
        Long id,
        String name,
        String description,
        Double price,
        Double purchasePrice,
        Integer stock,
        ProductCategory category
) {
}
