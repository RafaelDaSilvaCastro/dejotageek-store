package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Categoria;
import br.com.dejota.dejotaApi.repositorio.CategoriaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaRepositorio categoriaRepositorio;
    @CrossOrigin
    @PostMapping
    public String incluir(@RequestBody Categoria categoria){
        String messageReturn;
        try {
            categoria.setDataCriacao(Instant.now());
            categoriaRepositorio.save(categoria);
            messageReturn ="Categoria "+ categoria.getNome()+" criada com sucesso";
        }
        catch(Exception err){
            messageReturn ="NÂO Foi possivel criar a Categoria: "+err;
        }
        return messageReturn;
    }

}
