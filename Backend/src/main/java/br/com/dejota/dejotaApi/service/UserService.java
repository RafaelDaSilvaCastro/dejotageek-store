package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.Dtos.SignUpDto;
import br.com.dejota.dejotaApi.Dtos.ReadUserDto;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
