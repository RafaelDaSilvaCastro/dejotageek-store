package br.com.dejota.dejotaApi.controller;

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
    public ResponseEntity<?> getProfile(@PathVariable int id) {
        return new ResponseEntity<>(userService.getProfile(id), HttpStatus.OK);
    }

    @GetMapping("/{role}")
    public ResponseEntity<?> findByRole(@PathVariable String role) {
        return new ResponseEntity<>(userService.findByRole(role), HttpStatus.OK);
    }
}
