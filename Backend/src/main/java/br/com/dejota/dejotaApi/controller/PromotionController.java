package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreatePromotionDto;
import br.com.dejota.dejotaApi.dtos.ReadPromotionDto;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.service.PromotionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid CreatePromotionDto dto,
                                    @RequestParam("productId") Long productId) {
        promotionService.create(dto, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<Page<ReadPromotionDto>> findAll(@RequestParam(required = false) String filter,
                                                          @RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "20") Integer size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ReadPromotionDto> promotions = promotionService.findAll(filter, pageable);
        return new ResponseEntity<>(promotions, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                            @RequestBody @Valid CreatePromotionDto dto,
                                            @RequestParam("productId") Long productId) {
        promotionService.update(id, dto, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        promotionService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
