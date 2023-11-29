package br.com.dejota.dejotaApi.dtos;

public record CreateEmployeesDto(
        String name,
        String cpf,
        String phone,
        String email
) {
}
