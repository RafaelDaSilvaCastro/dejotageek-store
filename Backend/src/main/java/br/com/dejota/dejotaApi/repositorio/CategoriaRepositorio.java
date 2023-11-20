package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepositorio extends JpaRepository<Categoria, Long> {
}
