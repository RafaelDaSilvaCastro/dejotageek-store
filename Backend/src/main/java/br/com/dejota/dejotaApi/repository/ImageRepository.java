package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.enterprise.CustomQuerydslPredicateExecutor;
import br.com.dejota.dejotaApi.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>, CustomQuerydslPredicateExecutor<Image> {
    Image findById(long id);
}
