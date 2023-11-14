package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Dtos.ReadUserDto;
import br.com.dejota.dejotaApi.Dtos.SignInDto;
import br.com.dejota.dejotaApi.Dtos.SignUpDto;
import br.com.dejota.dejotaApi.Dtos.TokenDto;
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
