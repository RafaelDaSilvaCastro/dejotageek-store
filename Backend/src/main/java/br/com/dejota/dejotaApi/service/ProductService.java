package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateProductDto;
import br.com.dejota.dejotaApi.dtos.ReadProductDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Category;
import br.com.dejota.dejotaApi.model.Image;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.repository.ImageRepository;
import br.com.dejota.dejotaApi.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private CategoryService categoryService;

    public ReadProductDto create(CreateProductDto dto, Long categoryId) {
        productRepository.findByName(dto.name())
                .ifPresent(product -> {
                    throw new ValidationException("Produto já cadastrado");
                });

        Product product = toEntity(dto);
        Category category = categoryService.findById(categoryId)
                .orElseThrow(() -> new ValidationException("Categoria não encontrada"));

        product.setCategory(category);

        if (product.getImage() == null) {
            Image image = new Image("default", "1hksm2ffg5B3pPtr4QJ1HnlmdclTmRkZk");
            imageRepository.save(image);

            product.setImage(image);
        }

        productRepository.save(product);

        return toDto(product);
    }

    public ReadProductDto update(Long id, CreateProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        product.setName(dto.name());
        product.setDescription(dto.description());
        product.setPrice(dto.price());
        product.setPurchasePrice(dto.purchasePrice());
        product.setStock(dto.stock());

        productRepository.save(product);

        return toDto(product);
    }

    public void delete(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        productRepository.delete(product);
    }

    public Page<ReadProductDto> findAll(String filter, Pageable pageable) {
        LocalDate today = LocalDate.now();
        Page<Product> products = productRepository.findAll(filter, Product.class, pageable);

        Page<Product> productsWithDis = products.map(product -> {
            List<Promotion> promotions = product.getPromotion();

            if (!promotions.isEmpty()) {
                Optional<Promotion> promotion = promotions.stream()
                        .filter(p -> today.isAfter(p.getStartDate()) && today.isBefore(p.getEndDate()))
                        .max(Comparator.comparing(Promotion::getPercentage));

                promotion.ifPresent(value -> product.setPrice(product.getPrice() - (product.getPrice() * value.getPercentage() / 100)));
            }
            return product;
        });

        return productsWithDis.map(this::toDto);
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
                dto.stock()
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
                product.getImage().getKey(),
                product.getCategory().getName(),
                product.getCreatedAt()
        );
    }

    public List<Promotion> find(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        return product.getPromotion();
    }
}
