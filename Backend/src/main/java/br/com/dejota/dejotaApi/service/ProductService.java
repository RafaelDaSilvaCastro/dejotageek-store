package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ReadProductDto create(CreateProductDto dto) {
        Product existsProduct = findByName(dto.name());
        if (existsProduct != null) {
            throw new ValidationException("Produto já cadastrado");
        }

        Product product = toEntity(dto);
        productRepository.save(product);

        return toDto(product);
    }

    public Product findByName(String name) {
        return productRepository.findByName(name).orElse(null);
    }

    private Product toEntity(CreateProductDto dto) {
        return new Product(
                dto.name(),
                dto.description(),
                dto.price(),
                dto.purchasePrice(),
                dto.stock(),
                dto.category()
        );
    }

    private ReadProductDto toDto(Product product) {
        return new ReadProductDto(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getPurchasePrice(),
                product.getStock(),
                product.getCategory()
        );
    }
}
