package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;


@Data
@AllArgsConstructor
@Entity
@Table(name = "Transacoes")
public class Transacoes {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_transacao;
   @ManyToOne
   @JoinColumn(name = "id_produto")
   private Produto produto;
   @Column(name = "transacao")
    private TransacoesTipo tipo;
   @Column(name = "quantidade")
    private Long quantidade;
   @Column(name = "precoVenda")
   private Float precoVenda;
   @Column(name = "precoCompra")
   private Float precoCompra;
   @Column(name = "datahora", columnDefinition = "TIMESTAMP DEFAULT now()")
    private Instant datahora;


    public Long getId_transacao() {
        return id_transacao;
    }

    public void setId_transacao(Long id_transacao) {
        this.id_transacao = id_transacao;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public TransacoesTipo getTipo() {
        return tipo;
    }

    public void setTipo(TransacoesTipo tipo) {
        this.tipo = tipo;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public Float getPrecoVenda() {
        return precoVenda;
    }

    public void setPrecoVenda(Float precoVenda) {
        this.precoVenda = precoVenda;
    }

    public Float getPrecoCompra() {
        return precoCompra;
    }

    public void setPrecoCompra(Float precoCompra) {
        this.precoCompra = precoCompra;
    }

    public Instant getDatahora() {
        return datahora;
    }

    public void setDatahora(Instant datahora) {
        this.datahora = datahora;
    }

    @Override
    public String toString() {
        return "Transacao{" +
                " id : " + id_transacao +","+
                " transacao : " + tipo +","+
                " quantidade : " + quantidade +","+
                " precoCompra : " + precoCompra +","+
                " precoVenda : " + precoVenda +","+
                " datahora : " + datahora +
                "}";
    }
}
