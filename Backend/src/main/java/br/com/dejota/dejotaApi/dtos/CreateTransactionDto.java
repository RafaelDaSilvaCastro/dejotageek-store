package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.TransactionsType;

public record CreateTransactionDto(
        TransactionsType type,
        Integer quantity,
        Double price
) {
}
