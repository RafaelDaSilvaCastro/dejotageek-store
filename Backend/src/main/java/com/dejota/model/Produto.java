package com.dejota.model;

public class Produto extends EntityId {

    private String nome;
    private String descricao;
    private Double preco;
    private Integer estoque;
    private Categoria categoria;
    private String imagemUrl;

    public Produto() {
    }

    public Produto(Long id, String nome, String descricao, Integer codigo, Double preco, Integer estoque, Categoria categoria, String imagemUrl) {
        super(id);
        this.nome = nome;
        this.descricao = descricao;
        this.codigo = codigo;
        this.preco = preco;
        this.estoque = estoque;
        this.categoria = categoria;
        this.imagemUrl = imagemUrl;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
}
