package br.com.dejota.dejotaApi.dtos;

public record SignUpDto(
        String username,
        String email,
        String password,
        String confirmPassword
) {
}
