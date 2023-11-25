package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.ReadImageDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Image;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.QImage;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.ImageRepository;
import com.google.api.services.drive.model.File;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private ProductService productService;


    @Transactional
    public void uploadImage(MultipartFile file, Long id) throws IOException {
        Product product = productService.findById(id)
                .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));

        if (!isImage(file.getOriginalFilename())) {
            throw new ValidationException("Arquivo enviado não é uma imagem");
        }

        String fileName = UUID.randomUUID().toString() + extractExtension(file.getOriginalFilename());
        File googleFile = googleDriveService.createFile(fileName, file.getBytes());

        Image image = new Image(fileName, googleFile.getId());
        imageRepository.save(image);

        product.setImage(image);
    }

    public byte[] recoverImage(Long id) throws IOException {
        Product product = productService.findById(id)
                .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));

        return googleDriveService.getFileContent(product.getImage().getKey());
    }

    private ReadImageDto findByProductId(Long productId) {
        productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Id " + productId + " não encontrado"));
        return toDto(imageRepository.findAll(QImage.image.product.id.eq(productId)).get(0));
    }

    public void save(Image image) {
        imageRepository.save(image);
    }

    private boolean isImage(String fileName) {
        return fileName.endsWith(".jpg") || fileName.endsWith("jpeg") || fileName.endsWith(".png");
    }

    private String extractExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private ReadImageDto toDto(Image image) {
        return new ReadImageDto(image.getId(), image.getName(), image.getKey());
    }
}
