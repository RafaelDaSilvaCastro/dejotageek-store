package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Produto;
import br.com.dejota.dejotaApi.Modelo.Usuario;
import br.com.dejota.dejotaApi.repositorio.ProdutoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produto")
public class ProdutoController {
    @Autowired
    private ProdutoRepositorio prodRepositorio;

    @CrossOrigin
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

    @PutMapping
    @CrossOrigin
    public Void alterar(@RequestBody Produto prod){
        prodRepositorio.save(prod);
        return null;
    }

    //Deletando produto
    @DeleteMapping("/{id_produto}")
    @CrossOrigin
    public String deletarProduto(@PathVariable Long id_produto){
        Produto prod;
        String messagemRetur;
        try {
            prod = buscaProdutoPorId(id_produto);
            if (prod.getId_produto() != null) {
                prodRepositorio.delete(prod);
                messagemRetur = "O produto: " + prod.getDescricao() + " foi deletado";
            } else {
                messagemRetur = "O produto informado não foi encomtrado";
            }
        }
        catch (Exception err){
            messagemRetur = err.toString();
        }
        return messagemRetur;
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
    //Lista todos os produtos cadastrados
    @GetMapping("/todos")
    @CrossOrigin
    public List<Produto> buscaProdutoTodos(){
        return prodRepositorio.findAllProduto();
    }

    //Lista todos os produtos cadastrados ordenados pelo nome crescente
    @CrossOrigin
    @GetMapping("/todos/nomeasc")
    public List<Produto> buscaProdutoTodosOrdenadosNomeASC(){
        return prodRepositorio.findAllProdutoInOrderAsc();
    }

    //Lista todos os produtos cadastrados ordenados pelo nome decrescente
    @CrossOrigin
    @GetMapping("/todos/nomedesc")
    public List<Produto> buscaProdutoTodosOrdenadosNomeDESC(){
        return prodRepositorio.findAllProdutoInOrderDesc();
    }
}
