package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Estoque;
import br.com.dejota.dejotaApi.repositorio.EstoqueRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/estoque")
public class EstoqueController {

    @Autowired
    private EstoqueRepositorio estoqueRepositorio;
    @CrossOrigin
    @PostMapping
    public String incluir(@RequestBody Estoque estoque){
        String messageReturn;
        try {
            estoqueRepositorio.save(estoque);
            messageReturn ="Inseridos "+ estoque.getQuantidade()+" itens do produto "+estoque.getProduto();
        }
        catch(Exception err){
            messageReturn ="NÂO Foi possivel inserir o estoque: "+err;
        }
        return messageReturn;
    }

}
