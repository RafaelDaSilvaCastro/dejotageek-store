package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;


@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Usuario extends EntidadeId {

    @Column(name = "username")
    private String username;
    @Column(name = "email")
    private String email;
    @Column(name = "senha")
    private String senha;
    @Column(name = "data_cadastro")
    private Instant dataCadastro;


    public Usuario(String username, String email, String senha) {
        this.username = username;
        this.email = email;
        this.senha = senha;
    }
}
