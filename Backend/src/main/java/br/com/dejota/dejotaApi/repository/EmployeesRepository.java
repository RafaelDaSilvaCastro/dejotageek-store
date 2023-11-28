package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeesRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByName(String name);
}
