package br.com.dejota.dejotaApi.dtos;

import java.time.LocalDate;

public record CreatePromotionDto(
        String description,

        Double percentage,

        LocalDate startDate,

        LocalDate endDate
) {
}
