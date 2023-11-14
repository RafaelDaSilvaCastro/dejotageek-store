package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ReadProductDto> create(@RequestBody CreateProductDto dto) {
        return new ResponseEntity<>(productService.create(dto), HttpStatus.CREATED);
    }
}
