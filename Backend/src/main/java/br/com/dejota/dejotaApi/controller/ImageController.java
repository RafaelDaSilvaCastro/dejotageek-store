package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.dtos.ReadImageDto;
import br.com.dejota.dejotaApi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("file")MultipartFile file,
                                         @RequestParam("entity") String entity,
                                         @RequestParam("id") Long id) throws IOException {
        imageService.uploadImage(file, entity, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<?> recoverImage(@RequestParam("entity") String entity,
                                          @RequestParam("id") Long id) throws IOException {
        byte[] image = imageService.recoverImage(entity, id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }
}
