package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
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
<<<<<<< Updated upstream
=======
    @CrossOrigin
>>>>>>> Stashed changes
    @GetMapping("auth/{email}/{senha}")
    public Boolean autenticacao(@PathVariable String email, @PathVariable String senha) {

        // Transforma a senha em um MD5 usando a função do modelo
        senha = generateMd5(senha);

        // Verifica as credenciais do usuário
        return userRepositorio.verificaCredenciais(email, senha);
    }

    @PostMapping
    public String incluir(@RequestBody Usuario user){
        String messageReturn ;
        try {
            user.setDataCadastro(Instant.now());
            //user.setSenha(user.generateMd5(user.getSenha()));
            user.setSenha(generateMd5(user.getSenha()));
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



    //Gera MD5
    public String generateMd5(String value){
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        BigInteger hash = new BigInteger(1, md.digest(value.getBytes()));
        return hash.toString(16);
    }
}
