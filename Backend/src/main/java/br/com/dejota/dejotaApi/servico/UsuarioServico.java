package br.com.dejota.dejotaApi.servico;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.List;

@Service
public class UsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> listarUsuarios() {
        return usuarioRepositorio.findAll();
    }

    public Usuario buscarUsuarioPorId(Long id) {
        return usuarioRepositorio.findById(id).orElse(null);
    }

    public Boolean autenticarUsuario(String email, String senha) {
        return usuarioRepositorio.verificaCredenciais(email, senha);
    }

    public Usuario incluirUsuario(Usuario usuario) {
        usuario.setSenha(generateMd5(usuario.getSenha()));
        usuario.setDataCadastro(Instant.now());

        return usuarioRepositorio.save(usuario);
    }

    @Transactional
    public void alterarUsuario(Usuario usuario) {
        usuarioRepositorio.save(usuario);
    }

    @Transactional
    public void deletarUsuario(Long id) {
        usuarioRepositorio.deleteById(id);
    }

    private String generateMd5(String value){
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
