package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateTransactionDto;
import br.com.dejota.dejotaApi.dtos.ReadTransactionsDto;
import br.com.dejota.dejotaApi.enums.TransactionsType;
import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.model.Transactions;
import br.com.dejota.dejotaApi.repository.TransactionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionsService {

    @Autowired
    private TransactionsRepository transactionsRepository;

    @Autowired
    private ProductService productService;

    public void create(CreateTransactionDto dto, Long productId) {
        Product product = productService.findById(productId)
                .orElseThrow(() -> new ValidationException("Produto não encontrado"));

        if (dto.type().equals(TransactionsType.SELL)) {
            if (dto.quantity() < 0) {
                throw new ValidationException("Quantidade inválida");
            }
            if (dto.quantity() > product.getStock()) {
                throw new ValidationException("Quantidade insuficiente");
            }
            product.setStock(product.getStock() - dto.quantity());
        }

        if (dto.type().equals(TransactionsType.PURCHASE)) {
            if (dto.quantity() <= 0) {
                throw new ValidationException("Quantidade inválida");
            }
            if (dto.quantity() < 5) {
                throw new ValidationException("Quantidade mínima de compra é 5");
            }
            product.setStock(product.getStock() + dto.quantity());
        }

        Transactions transaction = toEntity(dto);
        transaction.setProduct(product);

        transactionsRepository.save(transaction);
    }

    public Page<ReadTransactionsDto> findAll(String filter, Pageable pageable) {
        Page<Transactions> transactions = transactionsRepository.findAll(filter, Transactions.class, pageable);
        return transactions.map(this::toDto);
    }


    private Transactions toEntity(CreateTransactionDto dto) {
        return new Transactions(
                dto.type(),
                dto.quantity(),
                dto.salePrice(),
                dto.purchasePrice()
        );
    }

    private ReadTransactionsDto toDto(Transactions transactions) {
        return new ReadTransactionsDto(
                transactions.getId(),
                transactions.getType(),
                transactions.getQuantity(),
                transactions.getSalePrice(),
                transactions.getPurchasePrice(),
                transactions.getDatetime(),
                transactions.getProduct().getName()
        );
    }
}
