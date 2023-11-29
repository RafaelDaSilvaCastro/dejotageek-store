package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeesRepository extends JpaRepository<Employees, Long> {
    Optional<Employees> findByName(String name);
}
