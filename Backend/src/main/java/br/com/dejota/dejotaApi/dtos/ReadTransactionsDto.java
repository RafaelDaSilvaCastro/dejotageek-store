package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.TransactionsType;

import java.time.LocalDateTime;

public record ReadTransactionsDto(
        String productName,
        int quantity,
        double price,
        double total,
        LocalDateTime datetime,
        Long id,
        TransactionsType type

) {
}
