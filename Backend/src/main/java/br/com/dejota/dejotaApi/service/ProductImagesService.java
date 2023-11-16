package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.ReadProductImagesDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.ProductImages;
import br.com.dejota.dejotaApi.repository.ProductImagesRepository;
import com.google.api.services.drive.model.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductImagesService {

    @Autowired
    private ProductImagesRepository productImagesRepository;

    @Autowired
    private GoogleDriveService googleDriveService;

    @Autowired
    private ProductService productService;


    public void uploadImage(MultipartFile file, Long productId) throws IOException {
        Product product = productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Id " + productId + " não encontrado"));

        if (!isImage(file.getOriginalFilename())) {
            throw new ValidationException("Arquivo não é uma imagem");
        }

        byte[] content = file.getBytes();
        String filename = product.getName() + "__=)__" + UUID.randomUUID() + extractExtension(file.getOriginalFilename());
        File uploadedImage = googleDriveService.createFile(filename, content);
        ProductImages productImages = new ProductImages(uploadedImage.getName(), uploadedImage.getId(), product);

        productImagesRepository.save(productImages);
    }

    public byte[] recoverImage(String fileId) throws IOException {
        return googleDriveService.getFileContent(fileId);
    }

    public List<ReadProductImagesDto> findAllImagesByProductId(Long productId) {
        List<ProductImages> productsImages = productImagesRepository.findAll("product_id " + productId , ProductImages.class);
        return productsImages.stream()
                .map(this::toDto)
                .toList();
    }

    private boolean isImage(String fileName) {
        return fileName.endsWith(".jpg") || fileName.endsWith("jpeg") || fileName.endsWith(".png");
    }

    private String extractExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private ReadProductImagesDto toDto(ProductImages productImages) {
        return new ReadProductImagesDto(productImages.getId(), productImages.getName(), productImages.getKey(), productImages.getProduct().getId());
    }
}
