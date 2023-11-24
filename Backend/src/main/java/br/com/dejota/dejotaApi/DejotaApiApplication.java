package br.com.dejota.dejotaApi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DejotaApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DejotaApiApplication.class, args);
	}

	@Bean
	public void maxInstant() {
		System.out.println("Max Instant: " + java.time.Instant.MAX);
	}
}
