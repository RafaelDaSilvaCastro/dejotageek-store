package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.TransactionsType;
import jakarta.validation.constraints.NotNull;

public record CreateTransactionDto(

        TransactionsType type,

        @NotNull(message = "A quantidade da transação não pode ser vazia")
        Integer quantity,

        @NotNull(message = "O preço da transação não pode ser vazio")
        Double price
) {
}