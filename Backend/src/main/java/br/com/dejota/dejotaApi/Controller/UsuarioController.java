package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio userRepositorio;

    //Listar
    @GetMapping
    public List<Usuario> listar(){
        return userRepositorio.findAll();
    }
    //Lista usuário pelo ID
    @GetMapping("/{id}")
    public Optional<Usuario> ler(@PathVariable Long id) {
        return userRepositorio.findById(id);
    }

    //Autenticação do usuário
    @GetMapping("auth/{email}/{senha}")
    public Boolean autenticacao(@PathVariable String email, @PathVariable String senha){
        return userRepositorio.verificaCredenciais(email, senha);
    }

    @PostMapping
    public String incluir(@RequestBody Usuario user){
        String messageReturn ;
        try {
            userRepositorio.save(user);
            messageReturn = "Novo usuário criado";
        }catch (Exception err){
            messageReturn = "Não foi possível criar o usuário erro: "+err;
        }
        return messageReturn;
    }

    //Alterar
    @PutMapping
    public void alterar(@RequestBody Usuario user){
        userRepositorio.save(user);
    }

    //Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        userRepositorio.deleteById(id);
    }
}
