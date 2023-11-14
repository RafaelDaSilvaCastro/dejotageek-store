package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Dtos.SignUpDto;
import br.com.dejota.dejotaApi.Dtos.ReadUserDto;
import br.com.dejota.dejotaApi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile/{id}")
    public ResponseEntity<ReadUserDto> getProfile(@PathVariable int id) {
        return new ResponseEntity<>(userService.getProfile(id), HttpStatus.OK);
    }
}
