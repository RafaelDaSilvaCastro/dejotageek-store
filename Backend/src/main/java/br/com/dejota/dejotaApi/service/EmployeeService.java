package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateEmployeeDto;
import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Employee;
import br.com.dejota.dejotaApi.model.Role;
import br.com.dejota.dejotaApi.repository.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeesRepository employeeRepository;

    @Autowired
    private RoleService roleService;

    public void save(CreateEmployeeDto dto) {
        employeeRepository.findByName(dto.name())
                .ifPresent(employee -> {
                    throw new ValidationException("Funcionário já cadastrado");
                });
        Role role = roleService.findByRole(UserRole.USER)
                .orElseThrow(() -> new ValidationException("Role não encontrada"));

        Employee employee = toEntity(dto);

        employee.setRole(role);
        employeeRepository.save(employee);
    }

    private Employee toEntity(CreateEmployeeDto dto) {
        return new Employee(
                dto.name(),
                dto.cpf(),
                dto.phone(),
                dto.email()
        );
    }
}
