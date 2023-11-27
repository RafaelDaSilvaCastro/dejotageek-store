package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.model.Role;
import br.com.dejota.dejotaApi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Optional<Role> findById(long id) {
        return roleRepository.findById(id);
    }

    public Optional<Role> findByRole(UserRole role) {
        return roleRepository.findByRole(role);
    }
}
