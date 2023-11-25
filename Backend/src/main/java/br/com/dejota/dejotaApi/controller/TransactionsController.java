package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateTransactionDto;
import br.com.dejota.dejotaApi.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions")
public class TransactionsController {

    @Autowired
    private TransactionsService transactionsService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreateTransactionDto dto,
                                    @RequestParam("productId") Long productId) {
        transactionsService.create(dto, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
