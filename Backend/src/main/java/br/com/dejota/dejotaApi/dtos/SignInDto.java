package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

public record SignInDto(
        @NotBlank(message = "Campo usuário não deve estar em branco")
        String username,

        @NotBlank(message = "Campo senha não deve estar em branco")
        String password
) {
}
