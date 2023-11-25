package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Long> {
}
