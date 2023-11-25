package br.com.dejota.dejotaApi.dtos;

public record ReadCategoryDto(
        Long id,
        String name,
        String description,
        String categoriaPai
) {
}
