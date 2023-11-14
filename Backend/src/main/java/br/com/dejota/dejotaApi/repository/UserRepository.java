package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.predicate.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, CustomQuerydslPredicateExecutor<User> {

    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
