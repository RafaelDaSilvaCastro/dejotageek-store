package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

public record SignUpDto(
        @NotBlank
        String username,

        @NotBlank
        String email,

        @NotBlank
        String password,

        @NotBlank
        String confirmPassword
) {
}
