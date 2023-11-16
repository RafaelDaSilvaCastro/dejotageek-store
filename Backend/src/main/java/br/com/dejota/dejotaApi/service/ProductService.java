package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ReadProductDto create(CreateProductDto dto) {
        Product product = toEntity(dto);
        productRepository.save(product);

        return toDto(product);
    }

    public Page<ReadProductDto> findAll(String filter, Pageable pageable) {
        Page<Product> products = productRepository.findAll(filter, Product.class, pageable);
        return products.map(this::toDto);
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
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
