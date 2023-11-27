package br.com.dejota.dejotaApi.enterprise;

import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.PathBuilder;

import java.lang.reflect.Field;
import java.time.Instant;
import java.time.LocalDate;

public class BooleanBuilderUtil {

    public static BooleanBuilder buildPredicate(String filter, Class<?> clazz) {
        if (filter == null || filter.isEmpty()) {
            return new BooleanBuilder();
        }

        BooleanBuilder predicate = new BooleanBuilder();
        String[] filterParts = filter.split("\\s+and\\s+");

        for (String singleFilter : filterParts) {
            String[] parts = singleFilter.split("\\s+");

            if (parts.length == 3) {
                buildSingleFilter(parts, clazz, predicate);

            } else if (parts.length == 4) {
                buildBetweenFilter(parts, clazz, predicate);
            }
        }
        return predicate;
    }

    private static void buildSingleFilter(String[] parts, Class<?> clazz, BooleanBuilder predicate) {
        try {
            Field field = getRecursively(clazz, parts[0]);
            field.setAccessible(true);
            Class<?> fieldType = field.getType();
            PathBuilder<?> fieldPath = new PathBuilder<>(fieldType, field.getName());

            switch (parts[1].toLowerCase()) {
                case "equal" -> predicate.and(Expressions.booleanTemplate("{0} = {1}", fieldPath, getType(fieldType, parts[2])));
                case "notEqual" -> predicate.and(Expressions.booleanTemplate("{0} <> {1}", fieldPath, getType(fieldType, parts[2])));
                case "greater" -> predicate.and(Expressions.booleanTemplate("{0} > {1}", fieldPath, getType(fieldType, parts[2])));
                case "lesser" -> predicate.and(Expressions.booleanTemplate("{0} < {1}", fieldPath, getType(fieldType, parts[2])));
                case "greaterequal" -> predicate.and(Expressions.booleanTemplate("{0} >= {1}", fieldPath, getType(fieldType, parts[2])));
                case "lesserequal" -> predicate.and(Expressions.booleanTemplate("{0} <= {1}", fieldPath, getType(fieldType, parts[2])));
                case "like" -> predicate.and(Expressions.booleanTemplate("{0} like '%'||{1}||'%'", fieldPath, Expressions.constant(parts[2])));
                default -> throw new ValidationException("Operador não suportado: " + parts[1]);
            }

        } catch (NoSuchFieldException e) {
            throw new ValidationException("Campo não encontrado: " + parts[0]);
        } catch (Exception e) {
            throw new ValidationException("Acesso ilegal ao campo: " + parts[0]);
        }
    }

    private static void buildBetweenFilter(String[] parts, Class<?> clazz, BooleanBuilder predicate) {
        try {
            Field field = getRecursively(clazz, parts[0]);
            field.setAccessible(true);
            Class<?> fieldType = field.getType();
            PathBuilder<?> fieldPath = new PathBuilder<>(fieldType, field.getName());

            if (parts[1].toLowerCase().equals("between")) {
                predicate.and(Expressions.booleanTemplate("{0} >= {1} AND {0} <= {2}", fieldPath, getType(fieldType, parts[2]), getType(fieldType, parts[3])));
            } else {
                throw new ValidationException("Operador não suportado: " + parts[1]);
            }

        } catch (NoSuchFieldException e) {
            throw new ValidationException("Campo não encontrado: " + parts[0]);
        } catch (Exception e) {
            throw new ValidationException("Acesso ilegal ao campo: " + parts[0]);
        }
    }

    private static Expression getType(Class<?> fieldType, String part) {
        return switch (fieldType.getName()) {
            case "java.lang.Integer", "int" -> Expressions.constant(Integer.parseInt(part));
            case "java.lang.Double", "double" -> Expressions.constant(Double.parseDouble(part));
            case "java.time.LocalDate" -> Expressions.constant(LocalDate.parse(part));
            case "java.time.Instant" -> Expressions.constant(Instant.parse(part));
            default -> {
                if (fieldType.isEnum()) {
                    yield Expressions.constant(Enum.valueOf((Class<Enum>) fieldType, part));
                }
                yield Expressions.constant(part);
            }
        };
    }

    private static Field getRecursively(Class<?> clazz, String fieldName) throws NoSuchFieldException {
        try {
            return clazz.getDeclaredField(fieldName);

        } catch (NoSuchFieldException e) {
            if (clazz.getSuperclass() != null) {
                return getRecursively(clazz.getSuperclass(), fieldName);
            }
            throw e;
        }
    }
}
