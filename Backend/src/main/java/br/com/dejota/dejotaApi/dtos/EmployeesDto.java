package br.com.dejota.dejotaApi.dtos;

public record CreateEmployeeDto(
        String name,
        String cpf,
        String phone,
        String email
) {
}
