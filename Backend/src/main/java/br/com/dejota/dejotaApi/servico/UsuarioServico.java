package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.UsuarioRepositorio;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
