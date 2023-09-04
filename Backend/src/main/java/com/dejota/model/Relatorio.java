package com.dejota.model;

import java.time.LocalDateTime;

public class Relatorio extends EntityId implements Relator {

    private LocalDateTime dataGeracao;
    private String nome;
    private String conteudo;
    private TipoRelatorio tipoRelatorio;

    public Relatorio() {
    }

    public Relatorio(Long id, LocalDateTime dataGeracao, String nome, String conteudo, TipoRelatorio tipoRelatorio) {
        super(id);
        this.dataGeracao = dataGeracao;
        this.nome = nome;
        this.conteudo = conteudo;
        this.tipoRelatorio = tipoRelatorio;
    }

    @Override
    public Relatorio gerarRelatorio() {
        return null;
    }

    public LocalDateTime getDataGeracao() {
        return dataGeracao;
    }

    public void setDataGeracao(LocalDateTime dataGeracao) {
        this.dataGeracao = dataGeracao;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public TipoRelatorio getTipoRelatorio() {
        return tipoRelatorio;
    }

    public void setTipoRelatorio(TipoRelatorio tipoRelatorio) {
        this.tipoRelatorio = tipoRelatorio;
    }
}
