package com.dejota.model;

import java.time.LocalDateTime;

public class Transacao extends EntityId implements Transacionavel {

    private LocalDateTime dataTransacao;
    private Double valor;
    private String tipo;

    public Transacao() {
    }

    public Transacao(Long id, LocalDateTime dataTransacao, Double valor, String tipo) {
        super(id);
        this.dataTransacao = dataTransacao;
        this.valor = valor;
        this.tipo = tipo;
    }

    public LocalDateTime getDataTransacao() {
        return dataTransacao;
    }

    public void setDataTransacao(LocalDateTime dataTransacao) {
        this.dataTransacao = dataTransacao;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @Override
    public void registrarTransacao(Transacao transacao) {
        if (transacao instanceof Compra) {
            System.out.println("Compra registrada com sucesso!");
            return;
        }
        System.out.println("Venda registrada com sucesso!");
    }
}
