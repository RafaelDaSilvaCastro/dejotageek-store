package br.com.dejota.dejotaApi.dtos;

import jakarta.validation.constraints.NotBlank;

public record CreateCategoryDto(

        @NotBlank(message = "O nome da categoria não pode ser vazio")
        String name,

        @NotBlank(message = "A descrição da categoria não pode ser vazia")
        String description,

        @NotBlank(message = "A categoria pai não pode ser vazia")
        String categoriaPai
) {

}
