package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Produto;
import br.com.dejota.dejotaApi.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/nome/{nome_produto}")
    public List<Produto> buscaProdutoPorNome(@PathVariable String nome_produto){
        return prodRepositorio.findByNome(nome_produto);

    }

    @GetMapping("/descricao/{descricao_produto}")
    public List<Produto> buscaProdutoPorDescricao(@PathVariable String nome_descricao){
        return prodRepositorio.findByDescricaoLike(nome_descricao);

    }

    @GetMapping("/preco/{valor1}/{valor2}")
    public List<Produto> buscaProdutoPorPreco(@PathVariable Double valor1, @PathVariable Double valor2){
        return prodRepositorio.findFaixaPreco(valor1, valor2);

    }

    @GetMapping("/estoque/{valor1}/{valor2}")
    public List<Produto> buscaProdutoPorEstoque(@PathVariable Integer valor1, @PathVariable Integer valor2){
        return prodRepositorio.findFaixaEstoque(valor1, valor2);

    }

    @GetMapping("/tudo")
    public List<Produto> buscaProdutoTodos(){
        return prodRepositorio.findAllProduto();

    }



}
