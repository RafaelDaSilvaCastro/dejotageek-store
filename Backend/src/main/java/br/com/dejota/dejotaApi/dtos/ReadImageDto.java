package br.com.dejota.dejotaApi.dtos;

public record ReadImageDto(
        Long id,
        String name,
        String key,
        Long productId,
        Long userId
) {
}
