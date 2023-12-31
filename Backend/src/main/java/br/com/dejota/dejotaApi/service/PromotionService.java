package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreatePromotionDto;
import br.com.dejota.dejotaApi.dtos.ReadPromotionDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PromotionService {

    @Autowired
    private PromotionRepository repository;

    @Autowired
    private ProductService productService;

    public void create(CreatePromotionDto dto, Long productId) {
        if (dto.percentage() <= 0) {
            throw new ValidationException("Porcentagem inválida");
        }

        if (dto.percentage() > 80) {
            throw new ValidationException("Porcentam não pode ser maior que 80% de desconto");
        }

        if (dto.startDate().isAfter(dto.endDate())) {
            throw new ValidationException("Data de início não pode ser maior que a data de término");
        }

        Promotion promotion = toEntity(dto);
        Product product = productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        promotion.setProduct(product);
        repository.save(promotion);
    }

    public Page<ReadPromotionDto> findAll(String filter, Pageable pageable) {
        Page<Promotion> promotions = repository.findAll(filter, Promotion.class, pageable);
        return promotions.map(this::toDto);
    }

    public void update(Long id, CreatePromotionDto dto, Long productId) {
        Promotion promotion = repository.findById(id)
                .orElseThrow(() -> new ValidationException("Promoção não encontrada"));

        Product product = productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        promotion.setDescription(dto.description());
        promotion.setPercentage(dto.percentage());
        promotion.setStartDate(dto.startDate());
        promotion.setEndDate(dto.endDate());
        promotion.setProduct(product);

        repository.save(promotion);
    }

    public void delete(Long id) {
        Promotion promotion = repository.findById(id)
                .orElseThrow(() -> new ValidationException("Promoção não encontrada"));

        repository.delete(promotion);
    }

    private Promotion toEntity(CreatePromotionDto dto) {
        return new Promotion(
                dto.description(),
                dto.percentage(),
                dto.startDate(),
                dto.endDate()
        );
    }

    private ReadPromotionDto toDto(Promotion promotion) {
        return new ReadPromotionDto(
                promotion.getDescription(),
                promotion.getPercentage(),
                promotion.getStartDate(),
                promotion.getEndDate(),
                promotion.getProduct().getName()
        );
    }
}
