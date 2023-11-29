package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateEmployeesDto;
import br.com.dejota.dejotaApi.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeesController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateEmployeesDto dto) {
        employeeService.save(dto);
        return ResponseEntity.ok().build();
    }
}
