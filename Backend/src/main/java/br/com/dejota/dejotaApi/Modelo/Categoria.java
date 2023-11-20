package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Table;
import java.time.Instant;

@Data
@AllArgsConstructor
@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_categoria;
    @Column(name = "nome")
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "categoriaPai")
    private Long categoriaPai;
    @Column(name = "dataCriacao")
    private Instant dataCriacao;

    @Override
    public String toString() {
        return "Categoria{" +
                "nome='" + nome + '\'' +
                ", descricao='" + descricao + '\'' +
                ", categoriaPai=" + categoriaPai +
                ", dataCriacao=" + dataCriacao +
                '}';
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

    public Long getCategoriaPai() {
        return categoriaPai;
    }

    public void setCategoriaPai(Long categoriaPai) {
        this.categoriaPai = categoriaPai;
    }

    public Instant getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}
