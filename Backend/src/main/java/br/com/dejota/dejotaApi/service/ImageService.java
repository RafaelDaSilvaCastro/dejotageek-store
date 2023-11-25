package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.ReadImageDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Image;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.QImage;
import br.com.dejota.dejotaApi.model.User;
import br.com.dejota.dejotaApi.repository.ImageRepository;
import com.google.api.services.drive.model.File;
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

    @Autowired
    private UserService userService;


    public void uploadImage(MultipartFile file, String entity, Long id) throws IOException {
        Image image;
        Object objectEntity;

        if (entity.equalsIgnoreCase("product")) {
            objectEntity = productService.findById(id)
                    .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));

        } else if (entity.equalsIgnoreCase("user")) {
            objectEntity = userService.findById(id)
                    .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));

        } else throw new ValidationException("entidade invalida, apenas 'product' ou 'user'");

        if (!isImage(file.getOriginalFilename())) {
            throw new ValidationException("Arquivo não é uma imagem");
        }

        byte[] content = file.getBytes();
        String fileName = objectEntity.getClass().getSimpleName() + "__=)__" + UUID.randomUUID() + extractExtension(file.getOriginalFilename());
        File uploadedImage = googleDriveService.createFile(fileName, content);
        image = new Image(uploadedImage.getName(), uploadedImage.getId());
        setEntity(image, objectEntity);

        imageRepository.save(image);
    }

    public byte[] recoverImage(String entity, Long id) throws IOException {
        Image image;
        if (entity.equalsIgnoreCase("product")) {
            productService.findById(id)
                    .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));
            image = imageRepository.findAll(QImage.image.product.id.eq(id)).get(0);

        } else if (entity.equalsIgnoreCase("user")) {
            userService.findById(id)
                    .orElseThrow(() -> new ValidationException("Id " + id + " não encontrado"));
            image = imageRepository.findAll(QImage.image.user.id.eq(id)).get(0);

        } else throw new ValidationException("entidade invalida, apenas 'product' ou 'user'");

        return googleDriveService.getFileContent(image.getKey());
    }

    public ReadImageDto findImageByEntity(String entity, Long id) {
        if (entity.equalsIgnoreCase("product")) {
            return findByProductId(id);
        }
        if (entity.equalsIgnoreCase("user")) {
            return findByUserId(id);
        }
        throw new ValidationException("entidade invalida, apenas 'product' ou 'user'");
    }

    private ReadImageDto findByProductId(Long productId) {
        productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Id " + productId + " não encontrado"));
        return toDto(imageRepository.findAll(QImage.image.product.id.eq(productId)).get(0));
    }

    private ReadImageDto findByUserId(Long userId) {
        userService.findById(userId)
                .orElseThrow(() -> new ValidationException("Id" + userId + " não encontrado"));
        return toDto(imageRepository.findAll(QImage.image.user.id.eq(userId)).get(0));
    }

    private void setEntity(Image image, Object object) {
        if (object instanceof Product) {
            image.setProduct((Product) object);
        } else {
            image.setUser((User) object);
        };
    }

    private boolean isImage(String fileName) {
        return fileName.endsWith(".jpg") || fileName.endsWith("jpeg") || fileName.endsWith(".png");
    }

    private String extractExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private ReadImageDto toDto(Image image) {
        return new ReadImageDto(image.getId(), image.getName(), image.getKey(), image.getProduct().getId(), image.getUser().getId());
    }
}
