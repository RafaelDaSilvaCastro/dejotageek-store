package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.service.ProductService;
import br.com.dejota.dejotaApi.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private PromotionService promotionService;

    @PostMapping("/create")
    public ResponseEntity<ReadProductDto> create(@RequestBody CreateProductDto dto,
                                                 @RequestParam("categoryId") Long categoryId) {
        return new ResponseEntity<>(productService.create(dto, categoryId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ReadProductDto>> findAll(@RequestParam(required = false) String filter,
                                                        @RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "5") int size,
                                                        @RequestParam(defaultValue = "id") String sortBy,
                                                        @RequestParam(defaultValue = "ASC") String sortDirection) {

        Sort sorted = Sort.by(Sort.Order.by(sortBy).with(Sort.Direction.valueOf(sortDirection)));
        Pageable pageable = PageRequest.of(page, size, sorted);
        Page<ReadProductDto> products = productService.findAll(filter, pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ReadProductDto> update(@PathVariable Long id,
                                                 @RequestBody CreateProductDto dto,
                                                 @RequestParam("categoryId") Long categoryId) {
        productService.update(id, dto, categoryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ReadProductDto> delete(@PathVariable Long id) {
        productService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
