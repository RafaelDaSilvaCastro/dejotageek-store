package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
        Integer stock
) {
}
