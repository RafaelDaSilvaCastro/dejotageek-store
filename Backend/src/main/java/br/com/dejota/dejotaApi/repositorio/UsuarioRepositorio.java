package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    @Query(value = " select username from usuario where email = :email ", nativeQuery = true)
    String encontrarPorEmail(@Param("email") String email );
    Boolean existsByEmail(String email);

    @Query(value = " select case when count(1) = 1 then true else false end from usuario where email = :email and senha = :senha ", nativeQuery = true)
    Boolean verificaCredenciais(@Param("email") String email, @Param("senha") String senha);

}
