package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.*;
import br.com.dejota.dejotaApi.model.Role;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.security.filters.JwtTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private JwtTokenService jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TokenDto signIn(SignInDto dto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.username(), dto.password());
        var authentication = this.authenticationManager.authenticate(usernamePassword);

        return new TokenDto(jwtTokenProvider.generateToken(dto.username()));
    }

    public ReadUserDto signUp(SignUpDto dto) {
        Optional<User> existsUsername = userService.findByUsername(dto.username());
        Optional<User> existsEmail = userService.findByEmail(dto.email());

        if (existsUsername.isPresent()) {
            throw new ValidationException("Nome de usuário já existe");
        }

        if (existsEmail.isPresent()) {
            throw new ValidationException("Email já existe");
        }

        if (!dto.password().equals(dto.confirmPassword())) {
            throw new ValidationException("Senhas não conferem");
        }

        User user = toEntity(dto);
        userService.save(user);

        return toDto(user);
    }

    public void forgotPassword(ForgotPasswordDto dto) {
        User user = userService.findByEmail(dto.email())
                .orElseThrow(() -> new ValidationException("Email não encontrado"));

        // TODO: Send email with new password
    }

    private User toEntity(SignUpDto dto) {
        return new User(
                dto.username(),
                dto.email(),
                passwordEncoder.encode(dto.password()),
                roleService.findByRole(UserRole.USER).get()
        );
    }

    private ReadUserDto toDto(User user) {
        return new ReadUserDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt().toString()
        );
    }
}
