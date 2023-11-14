package br.com.dejota.dejotaApi.model;

import br.com.dejota.dejotaApi.enums.UserRole;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tb_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", unique = true)
    private String username;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "senha")
    private String password;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(name = "data_cadastro", columnDefinition = "TIMESTAMP DEFAULT now()")
    private Instant dataCadastro;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        dataCadastro = Instant.now();
    }
}
