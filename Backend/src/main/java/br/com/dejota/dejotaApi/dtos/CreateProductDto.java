package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.ProductCategory;
import jakarta.validation.constraints.NotBlank;

public record CreateProductDto(
        @NotBlank
        String name,

        @NotBlank
        String description,

        @NotBlank
        Double price,

        @NotBlank
        Double purchasePrice,

        @NotBlank
        Integer stock,

        @NotBlank
        ProductCategory category
) {
}
