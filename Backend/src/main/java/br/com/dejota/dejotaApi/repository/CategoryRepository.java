package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.enterprise.CustomQuerydslPredicateExecutor;
import br.com.dejota.dejotaApi.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>, CustomQuerydslPredicateExecutor<Category> {
    Optional<Category> findByName(String name);
}
