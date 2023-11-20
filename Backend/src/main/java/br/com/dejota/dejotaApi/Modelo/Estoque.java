package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.Instant;

@Data
@AllArgsConstructor
@Entity
@Table(name = "estoque")
public class Estoque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_estoque;
    @OneToOne
    @NotNull
    @JoinColumn(name = "id_produto")
    private Produto produto;
    @Column(name = "descricao")
    private Long quantidade;
    @Column(name = "quantidadeMaxima")
    private Long quantidadeMaxima;
    @Column(name = "quantidadeMinima")
    private Long quantidadeMinima;

    @Override
    public String toString() {
        return "Estoque{" +
                "id_estoque=" + id_estoque +
                ", produto=" + produto +
                ", quantidade=" + quantidade +
                ", quantidadeMaxima=" + quantidadeMaxima +
                ", quantidadeMinima=" + quantidadeMinima +
                '}';
    }

    public Long getId_estoque() {
        return id_estoque;
    }

    public void setId_estoque(Long id_estoque) {
        this.id_estoque = id_estoque;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Long getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Long quantidade) {
        this.quantidade = quantidade;
    }

    public Long getQuantidadeMaxima() {
        return quantidadeMaxima;
    }

    public void setQuantidadeMaxima(Long quantidadeMaxima) {
        this.quantidadeMaxima = quantidadeMaxima;
    }

    public Long getQuantidadeMinima() {
        return quantidadeMinima;
    }

    public void setQuantidadeMinima(Long quantidadeMinima) {
        this.quantidadeMinima = quantidadeMinima;
    }
}
