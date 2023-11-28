package br.com.dejota.dejotaApi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Employees")
public class Employee extends EntityId {

    @Column(name = "name")
    private String name;

    @Column(name = "cpf", unique = true)
    private String cpf;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public Employee(String name, String cpf, String phone, String email) {
        this.name = name;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        createdAt = LocalDate.now();
    }
}
