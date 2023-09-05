package com.dejota.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Compra extends EntityId  {

    private List<Produto> produtosComprados = new ArrayList<>();
    private Usuario usuario;
    private Transacao transacao;

    public Compra() {
    }

    public Compra(Long id, LocalDateTime dataTransacao, Double valor, Usuario usuario) {
        super(id, dataTransacao, valor, "Compra");
        this.usuario = usuario;
    }

    public void addProduto(Produto produto) {
        produtosComprados.add(produto);
    }

    public List<Produto> getProdutosComprados() {
        return produtosComprados;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
