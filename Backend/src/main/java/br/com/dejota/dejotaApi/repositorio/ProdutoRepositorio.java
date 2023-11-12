package br.com.dejota.dejotaApi.repositorio;

import br.com.dejota.dejotaApi.Modelo.Produto;
import org.hibernate.sql.ast.tree.predicate.BooleanExpressionPredicate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProdutoRepositorio extends JpaRepository<Produto, Long> {

    @Query("SELECT COUNT(*) FROM Produto p WHERE p.id_produto = :idProduto")
    Boolean existsByid_produto(@Param("idProduto") Long idProduto);

    List<Produto> findByNome(String produto);

    List<Produto> findByDescricaoLike(String produto);

    @Query(value = "SELECT * FROM Produto p WHERE p.preco between :Valor1 AND :Valor2", nativeQuery = true)
    List<Produto> findFaixaPreco(@Param("Valor1") Double valor1, @Param("Valor2") Double valor2);

    @Query(value = "SELECT * FROM Produto p WHERE p.estoque between :Valor1 AND :Valor2", nativeQuery = true)
    List<Produto> findFaixaEstoque(@Param("Valor1") Integer valor1, @Param("Valor2") Integer valor2);

    @Query(value = "SELECT * FROM Produto", nativeQuery = true)
    List<Produto> findAllProduto();

    @Query(value = "SELECT * FROM PRODUTO ORDER BY NOME ASC", nativeQuery = true)
    List<Produto> findAllProdutoInOrderAsc();

    @Query(value = "SELECT * FROM PRODUTO ORDER BY NOME DESC", nativeQuery = true)
    List<Produto> findAllProdutoInOrderDesc();
}
