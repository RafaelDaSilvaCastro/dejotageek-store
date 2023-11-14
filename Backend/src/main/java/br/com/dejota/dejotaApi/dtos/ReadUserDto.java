package br.com.dejota.dejotaApi.dtos;

public record ReadUserDto(
        Long id,
        String username,
        String email,
        String dataCadastro
) {
}
