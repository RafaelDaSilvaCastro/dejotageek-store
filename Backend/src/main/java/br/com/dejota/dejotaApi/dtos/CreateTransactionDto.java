package br.com.dejota.dejotaApi.dtos;

import br.com.dejota.dejotaApi.enums.TransactionsType;
import jakarta.validation.constraints.NotBlank;

public record CreateTransactionDto(

        @NotBlank(message = "O tipo da transação não pode ser vazio")
        TransactionsType type,

        @NotBlank(message = "A quantidade da transação não pode ser vazia")
        Integer quantity,

        @NotBlank(message = "O preço da transação não pode ser vazio")
        Double price
) {
}