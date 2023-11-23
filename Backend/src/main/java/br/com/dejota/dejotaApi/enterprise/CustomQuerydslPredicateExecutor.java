package br.com.dejota.dejotaApi.enterprise;

import com.querydsl.core.types.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

import static br.com.dejota.dejotaApi.enterprise.BooleanBuilderUtil.buildPredicate;

public interface CustomQuerydslPredicateExecutor<T> extends QuerydslPredicateExecutor<T> {

    @Override
    List<T> findAll(Predicate predicate);

    default List<T> findAll(String filter, Class<T> entityType) {
        return this.findAll(buildPredicate(filter, entityType));
    }

    default Page<T> findAll(String filter, Class<T> entityType, Pageable pageable) {
        return this.findAll(buildPredicate(filter, entityType), pageable);
    }

}
