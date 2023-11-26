package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateTransactionDto;
import br.com.dejota.dejotaApi.dtos.ReadTransactionsDto;
import br.com.dejota.dejotaApi.service.TransactionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @GetMapping
    public ResponseEntity<Page<ReadTransactionsDto>> findAll(@RequestParam(required = false) String filter,
                                                             @RequestParam(defaultValue = "0") int page,
                                                             @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("datetime")));
        return new ResponseEntity<>(transactionsService.findAll(filter, pageable), HttpStatus.OK);
    }
}
