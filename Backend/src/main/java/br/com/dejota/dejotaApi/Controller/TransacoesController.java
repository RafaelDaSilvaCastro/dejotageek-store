package br.com.dejota.dejotaApi.Controller;

import br.com.dejota.dejotaApi.Modelo.Transacoes;
import br.com.dejota.dejotaApi.repositorio.TransacaoesRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/transacao")
public class TransacoesController {
    @Autowired
    private TransacaoesRepositorio tranRepositorio;

    @PostMapping
    public String incluir(@RequestBody Transacoes tran){
        String messageReturn;
        try {
            tranRepositorio.save(tran);
            messageReturn ="Foi";
        }
        catch(Exception err){
            messageReturn ="NÂO Foi";
        }
        return messageReturn;
    }
}
