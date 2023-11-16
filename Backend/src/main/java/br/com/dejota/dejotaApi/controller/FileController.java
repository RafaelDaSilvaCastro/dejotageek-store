package br.com.dejota.dejotaApi.controller;

import br.com.dejota.dejotaApi.service.GoogleDriveService;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/file")
public class FileController {

    @Autowired
    private GoogleDriveService googleDriveService;

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file")MultipartFile file) throws IOException {
        File uploadedFile = googleDriveService.createFile(file.getOriginalFilename(), file.getBytes());
        return ResponseEntity.ok(uploadedFile.getId());
    }

    @GetMapping("/download")
    public ResponseEntity<?> download(@RequestParam("fileId") String fileId) throws IOException {
        byte[] content = googleDriveService.getFileContent(fileId);

        MediaType mediaType = MediaType.IMAGE_JPEG;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(mediaType);
        headers.setContentLength(content.length);
        headers.setContentDispositionFormData("attachment", "image.jpg"); // Specify the filename

        ByteArrayResource resource = new ByteArrayResource(content);

        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }
}
