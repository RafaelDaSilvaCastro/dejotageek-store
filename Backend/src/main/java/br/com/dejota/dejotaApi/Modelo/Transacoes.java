package br.com.dejota.dejotaApi.Modelo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;


@Data
@AllArgsConstructor
@Entity
public class Transacoes {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
   @Column(name = "transacao")
    private TransacoesTipo tipo;
   @Column(name = "quantidade")
    private Long quantidade;
   @Column(name = "datahora", columnDefinition = "TIMESTAMP DEFAULT now()")
    private Instant datahora;

    @Override
    public String toString() {
        return "Transacao{" +
                " id : " + id +","+
                " transacao : " + tipo +","+
                " quantidade : " + quantidade +","+
                " datahora : " + datahora +
                "}";
    }
}
