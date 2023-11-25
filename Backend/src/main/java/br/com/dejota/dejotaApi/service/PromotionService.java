package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreatePromotionDto;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.Promotion;
import br.com.dejota.dejotaApi.repository.PromotionRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

        Promotion promotion = toEntity(dto);
        Product product = productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        promotion.setProduct(product);
        repository.save(promotion);
    }

    private Promotion toEntity(CreatePromotionDto dto) {
        return new Promotion(
                dto.description(),
                dto.percentage(),
                dto.startDate(),
                dto.endDate()
        );
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
}
