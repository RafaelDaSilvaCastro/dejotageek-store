package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;


import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
@AllArgsConstructor
@Entity
@Table(name = "Produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_produto;
    @ManyToOne
    @NotNull
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;
    @Column(name = "nome")
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "preco")
    private Float preco;
    @Column(name = "precoCompra")
    private Float precoCompra;

    @Override
    public String toString() {
        return "Produto{" +
                "id_produto=" + id_produto +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", categoria" + categoria +
                '}';
    }

    public Long getId_produto() {
        return id_produto;
    }

    public void setId_produto(Long id_produto) {
        this.id_produto = id_produto;
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

    public Float getPreco() {
        return preco;
    }

    public void setPreco(Float preco) {
        this.preco = preco;
    }

    public Float getPrecoCompra() {
        return precoCompra;
    }

    public void setPrecoCompra(Float precoCompra) {
        this.precoCompra = precoCompra;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}