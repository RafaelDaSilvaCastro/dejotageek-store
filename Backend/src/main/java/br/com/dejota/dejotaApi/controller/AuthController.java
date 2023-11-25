package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.*;
import br.com.dejota.dejotaApi.service.AuthService;
import jakarta.validation.Valid;
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


    @PostMapping("/signin")
    public ResponseEntity<TokenDto> signIn(@RequestBody @Valid SignInDto dto) {
        TokenDto token = authService.signIn(dto);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<ReadUserDto> signUp(@RequestBody @Valid SignUpDto dto) {
        ReadUserDto user = authService.signUp(dto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody @Valid ForgotPasswordDto dto) {
        authService.forgotPassword(dto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
