package br.com.dejota.dejotaApi.service;

import br.com.dejota.dejotaApi.dtos.CreateCategoryDto;
import br.com.dejota.dejotaApi.dtos.ReadCategoryDto;
import br.com.dejota.dejotaApi.model.Category;
import br.com.dejota.dejotaApi.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public ReadCategoryDto create(CreateCategoryDto dto) {
        Category category = new Category(
                dto.name(),
                dto.description(),
                dto.categoriaPai()
        );
        repository.save(category);
        return toDto(category);
    }

    public Page<ReadCategoryDto> findAll(String filter, Pageable pageable) {
        Page<Category> categories = repository.findAll(filter, Category.class, pageable);
        return categories.map(this::toDto);
    }

    public Optional<Category> findById(Long id) {
        return repository.findById(id);
    }

    private Category toEntity(CreateCategoryDto dto) {
        return new Category(
                dto.name(),
                dto.description(),
                dto.categoriaPai()
        );
    }

    private ReadCategoryDto toDto(Category category) {
        return new ReadCategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCategoriaPai()
        );
    }

    public ReadCategoryDto update(Long id, CreateCategoryDto dto) {
        Category category = repository.findById(id).orElseThrow();
        category.setName(dto.name());
        category.setDescription(dto.description());
        category.setCategoriaPai(dto.categoriaPai());
        repository.save(category);
        return toDto(category);
    }
}
