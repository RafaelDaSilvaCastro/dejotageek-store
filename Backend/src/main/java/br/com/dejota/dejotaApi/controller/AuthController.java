package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.ReadUserDto;
import br.com.dejota.dejotaApi.dtos.SignInDto;
import br.com.dejota.dejotaApi.dtos.SignUpDto;
import br.com.dejota.dejotaApi.dtos.TokenDto;
import br.com.dejota.dejotaApi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("signin")
    public ResponseEntity<TokenDto> signIn(@RequestBody SignInDto dto) {
        return new ResponseEntity<>(authService.signIn(dto), HttpStatus.OK);
    }

    @PostMapping("signup")
    public ResponseEntity<ReadUserDto> signUp(@RequestBody SignUpDto dto) {
        return new ResponseEntity<>(authService.signUp(dto), HttpStatus.CREATED);
    }
}
