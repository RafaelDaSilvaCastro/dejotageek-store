package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepositorio extends JpaRepository<Estoque, Long> {
}
