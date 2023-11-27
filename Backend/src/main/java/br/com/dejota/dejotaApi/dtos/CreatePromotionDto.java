package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record CreatePromotionDto(

        @NotBlank(message = "O nome da promoção não pode ser vazio")
        String description,

        @NotNull(message = "A porcentagem da promoção não pode ser vazia")
        Double percentage,

        LocalDate startDate,

        LocalDate endDate
) {
}
