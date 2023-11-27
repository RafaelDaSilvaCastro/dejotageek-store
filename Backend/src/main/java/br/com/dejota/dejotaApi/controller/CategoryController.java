package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreateCategoryDto;
import br.com.dejota.dejotaApi.dtos.ReadCategoryDto;
import br.com.dejota.dejotaApi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public ResponseEntity<ReadCategoryDto> create(@RequestBody CreateCategoryDto dto) {
        return new ResponseEntity<>(categoryService.create(dto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<ReadCategoryDto>> findAll(@RequestParam(required = false) String filter,
                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return new ResponseEntity<>(categoryService.findAll(filter, pageable), HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ReadCategoryDto> update(@PathVariable Long id, @RequestBody CreateCategoryDto dto) {
        categoryService.update(id, dto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
