package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@NoArgsConstructor
@Entity
@AllArgsConstructor
@Data
@Table(name = "Produto")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_produto;
    @Column(name = "nome")
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "preco")
    private Float preco;
    @Column(name = "precoCompra")
    private Float precoCompra;
    @Column(name = "estoque")
    private Integer estoque;
    @Column(name = "categoria")
    private CategoriaProduto categoria;

    @OneToMany
    @JoinColumn(name = "id_transacao")
    private List<Transacoes> transacoes = new ArrayList<>();

    @Override
    public String toString() {
        return "Produto{" +
                "id_produto=" + id_produto +
                ", nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", preco=" + preco +
                ", estoque=" + estoque +
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

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }
}
