package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.ReadProductImagesDto;
import br.com.dejota.dejotaApi.service.GoogleDriveService;
import br.com.dejota.dejotaApi.service.ProductImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/product-images")
public class ProductImagesController {

    @Autowired
    private ProductImagesService productImagesService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("file")MultipartFile file,
                                         @RequestParam("productId") Long productId) throws IOException {
        productImagesService.uploadImage(file, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> recoverImage(@RequestParam("fileId") String fileId) throws IOException {
        return new ResponseEntity<>(productImagesService.recoverImage(fileId), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReadProductImagesDto>> findAllImagesByProductId(
            @RequestParam("productId") Long productId) {
        return ResponseEntity.ok(productImagesService.findAllImagesByProductId(productId));
    }
}
