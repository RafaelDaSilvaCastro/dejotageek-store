package br.com.dejota.dejotaApi.dtos;

import java.time.LocalDate;

public record ReadPromotionDto(
        String description,
        Double percentage,
        LocalDate startDate,
        LocalDate endDate,
        String productName
) {
}
