package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.SignUpDto;
import br.com.dejota.dejotaApi.dtos.ReadUserDto;
import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.model.QUser;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ReadUserDto getProfile(long id) {
        User user = findById(id);
        if (user == null) {
            throw new RuntimeException("Usuário não encontrado");
        }

        return toDto(user);
    }

    public List<ReadUserDto> findByRole(String role) {
        UserRole userRole = UserRole.valueOf(role);
        List<User> users = userRepository.findAll(QUser.user.role.eq(userRole));

        return users.stream()
                .map(this::toDto)
                .toList();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User findById(long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    private User toEntity(SignUpDto dto) {
        return new User(
                dto.username(),
                dto.email(),
                dto.password()
        );
    }

    private ReadUserDto toDto(User user) {
        return new ReadUserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getDataCadastro().toString()
        );
    }
}
