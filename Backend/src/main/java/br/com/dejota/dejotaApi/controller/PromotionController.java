package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.CreatePromotionDto;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/promotions")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody CreatePromotionDto dto,
                                    @RequestParam("productId") Long productId) {
        promotionService.create(dto, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                            @RequestBody CreatePromotionDto dto,
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
