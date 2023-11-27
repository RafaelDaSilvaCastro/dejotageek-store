package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

public record ForgotPasswordDto(@NotBlank String email) {
}
