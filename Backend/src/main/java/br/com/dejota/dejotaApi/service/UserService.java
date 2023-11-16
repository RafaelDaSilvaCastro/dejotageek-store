package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.ReadUserDto;
import br.com.dejota.dejotaApi.dtos.SignUpDto;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public ReadUserDto getProfile(long id) {
        Optional<User> user = findById(id);
        if (user.isEmpty()) {
            throw new RuntimeException("Usuário não encontrado");
        }
        return toDto(user.get());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findById(long id) {
        return userRepository.findById(id);
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
