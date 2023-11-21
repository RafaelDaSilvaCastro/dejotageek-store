package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

public record SignInDto(
        @NotBlank
        String username,

        @NotBlank
        String password
) {
}
