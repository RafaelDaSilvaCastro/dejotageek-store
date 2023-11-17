package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Transacoes;
import br.com.dejota.dejotaApi.repositorio.ProdutoRepositorio;
import br.com.dejota.dejotaApi.repositorio.TransacaoesRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
@RequestMapping("/transacao")
public class TransacoesController {
    @Autowired
    private TransacaoesRepositorio tranRepositorio;
    @CrossOrigin
    @PostMapping
    public String incluir(@RequestBody Transacoes tran){
        String messageReturn;
        try {
            tran.setDatahora(Instant.now());
            tranRepositorio.save(tran);
            messageReturn ="Transação do tipo: "+ tran.getTipo()+" criada com sucesso";
        }
        catch(Exception err){
            messageReturn ="NÂO Foi possivel criar a transacao: "+err;
        }
        return messageReturn;
    }
}