package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Produto;
import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    @Autowired
    private ProdutoRepositorio prodRepositorio;

    @PostMapping
    public String incluir(@RequestBody Produto prod){
        String messageReturn ;
        try {
            prodRepositorio.save(prod);
            messageReturn = "Novo produto criado";
        }catch (Exception err){
            messageReturn = "Não foi possível criar o produto erro: "+err;
        }
        return messageReturn;
    }

    @GetMapping("/{id_produto}")
    public Produto buscaProdutoPorId(@PathVariable Long id_produto){
        return prodRepositorio.findById(id_produto).orElse(null);

    }





}
