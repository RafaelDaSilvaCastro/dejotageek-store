package br.com.dejota.dejotaApi.Dtos;

public record ReadUserDto(
        Long id,
        String username,
        String email,
        String dataCadastro
) {
}
