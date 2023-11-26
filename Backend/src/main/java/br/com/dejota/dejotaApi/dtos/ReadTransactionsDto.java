package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.TransactionsType;

import java.time.LocalDateTime;

public record ReadTransactionsDto(
        Long id,
        TransactionsType type,
        int quantity,
        float salePrice,
        float purchasePrice,
        LocalDateTime datetime,
        String productName
) {
}
