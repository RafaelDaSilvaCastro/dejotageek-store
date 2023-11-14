package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.Dtos.SignUpDto;
import br.com.dejota.dejotaApi.Dtos.ReadUserDto;
import br.com.dejota.dejotaApi.Dtos.SignInDto;
import br.com.dejota.dejotaApi.Dtos.TokenDto;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.security.filters.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TokenDto signIn(SignInDto dto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.username(), dto.password());
        var authentication = this.authenticationManager.authenticate(usernamePassword);

        return new TokenDto(jwtTokenProvider.generateToken(dto.username()));
    }

    public ReadUserDto signUp(SignUpDto dto) {
        User existsUser = userService.findByUsername(dto.username());
        User existsEmail = userService.findByEmail(dto.email());

        if (existsUser != null) {
            throw new ValidationException("Nome de usuário já cadastrado");
        }

        if (existsEmail != null) {
            throw new ValidationException("Email já cadastrado");
        }

        if (!dto.password().equals(dto.confirmPassword())) {
            throw new ValidationException("Senhas não conferem");
        }

        User user = toEntity(dto);

        user.setProfileImageUrl("default-user-profile-image.png");
        user.setRole(UserRole.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.save(user);

        return toDto(user);
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
