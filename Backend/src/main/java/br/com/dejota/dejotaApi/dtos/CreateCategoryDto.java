package br.com.dejota.dejotaApi.dtos;

public record CreateCategoryDto(

        String name,
        String description,
        String categoriaPai
) {

}
