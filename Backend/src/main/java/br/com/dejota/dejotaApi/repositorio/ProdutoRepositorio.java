package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Produto;
import org.hibernate.sql.ast.tree.predicate.BooleanExpressionPredicate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProdutoRepositorio extends JpaRepository<Produto, Long> {

    @Query("SELECT COUNT(*) FROM Produto p WHERE p.id_produto = :idProduto")
    Boolean existsByid_produto(@Param("idProduto") Long idProduto);
}
