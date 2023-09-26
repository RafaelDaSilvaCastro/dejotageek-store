package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.servico.UsuarioServico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioServico usuarioServico;

    //Listar
    @GetMapping
    public List<Usuario> listar(){
        return usuarioServico.listarUsuarios();
    }
    //Lista usuário pelo ID
    @GetMapping("/{id}")
    public Usuario ler(@PathVariable Long id) {
        return usuarioServico.buscarUsuarioPorId(id);
    }

    //Autenticação do usuário
    @GetMapping("auth/{email}/{senha}")
    public Boolean autenticacao(@PathVariable String email, @PathVariable String senha){
        return usuarioServico.autenticarUsuario(email, senha);
    }

    @PostMapping
    public Usuario incluir(@RequestBody Usuario user){
        return usuarioServico.incluirUsuario(user);
    }

    //Alterar
    @PutMapping
    public void alterar(@RequestBody Usuario usuario) {
        usuarioServico.alterarUsuario(usuario);
    }

    //Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        usuarioServico.deletarUsuario(id);
    }
}
