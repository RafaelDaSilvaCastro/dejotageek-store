package br.com.dejota.dejotaApi;

import br.com.dejota.dejotaApi.enums.UserRole;
import br.com.dejota.dejotaApi.model.Role;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.RoleRepository;
import br.com.dejota.dejotaApi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.time.LocalDate;

@SpringBootApplication
public class DejotaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DejotaApiApplication.class, args);
	}

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private RoleRepository roleRepository;

	@Bean
	public void createAdmin() {
		User user = new User();
		Role role = roleRepository.findByRole(UserRole.ADMIN).get();

		user.setUsername("admin");
		user.setEmail("admin@admin.com");
		user.setPassword(encoder.encode("admin"));
		user.setRole(role);
		user.setCreatedAt(Instant.now());

		userRepository.save(user);
	}
}
