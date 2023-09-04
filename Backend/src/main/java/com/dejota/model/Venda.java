package com.dejota.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Venda extends Transacao {

    private List<Produto> produtosVendidos =  new ArrayList<>();
    private Usuario usuario;

    public Venda() {
    }

    public Venda(Long id, LocalDateTime dataTransacao, Double valor, String tipo, Usuario usuario) {
        super(id, dataTransacao, valor, "Venda");
        this.usuario = usuario;
    }
}
