package br.com.dejota.dejotaApi.Dtos;

public record SignUpDto(
        String username,
        String email,
        String password,
        String confirmPassword
) {
}
