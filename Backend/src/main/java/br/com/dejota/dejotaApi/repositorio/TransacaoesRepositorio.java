package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Transacoes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoesRepositorio extends JpaRepository<Transacoes, Long> {
}
