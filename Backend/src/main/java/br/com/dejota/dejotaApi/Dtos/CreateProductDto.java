package br.com.dejota.dejotaApi.Dtos;

import br.com.dejota.dejotaApi.enums.ProductCategory;

public record CreateProductDto(
        String name,
        String description,
        Double price,
        Double purchasePrice,
        Integer stock,
        ProductCategory category
) {
}
