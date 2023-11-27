package br.com.dejota.dejotaApi.repository;

import br.com.dejota.dejotaApi.model.Product;
import br.com.dejota.dejotaApi.enterprise.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, CustomQuerydslPredicateExecutor<Product> {
    Optional<Product> findByName(String name);

//    @Query(nativeQuery = true, value = "SELECT P.id,P.name,P.description,P.purchase_price,P.stock,P.category_id,P.image_id,P.created_at, CASE WHEN CURRENT_DATE BETWEEN P2.start_date AND P2.end_date THEN P.price - (P.price * (P2.percentage / 100)) ELSE P.price END price FROM products p LEFT JOIN promotions p2 ON (P.id = P2.product_id)")
//    List<Product> findAllProducts();
}

/*
SELECT P.id,P."name",P.description,P.purchase_price,P.stock,P.category_id,P.image_id,P.created_at, CASE WHEN CURRENT_DATE BETWEEN P2.start_date AND P2.end_date THEN P.price - (P.price * (P2.percentage / 100)) ELSE P.price END price FROM products p LEFT JOIN promotions p2 ON (P.id = P2.product_id)
 */
