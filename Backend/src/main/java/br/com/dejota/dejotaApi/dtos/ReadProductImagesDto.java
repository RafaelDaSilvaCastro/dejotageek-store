package br.com.dejota.dejotaApi.dtos;

public record ReadProductImagesDto(
        Long id,
        String name,
        String key,
        Long productId
) {
}
