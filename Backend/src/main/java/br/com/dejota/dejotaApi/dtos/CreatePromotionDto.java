package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record CreatePromotionDto(

        @NotBlank(message = "O nome da promoção não pode ser vazio")
        String description,

        @NotBlank(message = "A porcentagem da promoção não pode ser vazia")
        Double percentage,

        @NotBlank(message = "A data de início da promoção não pode ser vazia")
        LocalDate startDate,

        @NotBlank(message = "A data de término da promoção não pode ser vazia")
        LocalDate endDate
) {
}
