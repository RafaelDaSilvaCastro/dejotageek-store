package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(UserRole role);
}
