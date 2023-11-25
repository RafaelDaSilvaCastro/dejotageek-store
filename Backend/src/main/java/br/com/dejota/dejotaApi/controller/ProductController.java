package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<ReadProductDto> create(@RequestBody CreateProductDto dto) {
        return new ResponseEntity<>(productService.create(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ReadProductDto>> findAll(@RequestParam(required = false) String filter,
                                                        @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "10") int size,
                                                        @RequestParam(defaultValue = "id") String sortBy,
                                                        @RequestParam(defaultValue = "ASC") String sortDirection) {

        Sort sorted = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.valueOf(sortDirection)));
        Pageable pageable = PageRequest.of(page, size, sorted);
        return new ResponseEntity<>(productService.findAll(filter, pageable), HttpStatus.OK);
    }
}
