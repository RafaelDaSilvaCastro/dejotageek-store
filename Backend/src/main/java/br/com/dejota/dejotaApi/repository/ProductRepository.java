package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.enterprise.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, CustomQuerydslPredicateExecutor<Product> {
    Optional<Product> findByName(String name);
}
