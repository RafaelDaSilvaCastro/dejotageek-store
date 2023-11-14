package br.com.dejota.dejotaApi.enterprise;

import br.com.dejota.dejotaApi.exception.custom.ValidationException;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.PathBuilder;

import java.lang.reflect.Field;
import java.time.LocalDate;

public class BooleanBuilderUtil {

    public static BooleanBuilder buildPredicateFromFilter(String filter, Class<?> classe) {
        if (filter == null || filter.isEmpty()) {
            return new BooleanBuilder();
        }

        BooleanBuilder predicate = new BooleanBuilder();
        String[] partes = filter.split("\\+");

        if (partes.length == 3) {
            try {
                Field campo = getFieldRecursivamente(classe, partes[0]);
                campo.setAccessible(true);
                Class<?> tipoCampo = campo.getType();
                PathBuilder<?> campoPath = new PathBuilder<>(tipoCampo, campo.getName());

                switch (partes[1].toLowerCase()) {
                    case "equal":
                        predicate.and(Expressions.booleanTemplate("{0} = {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "notEqual":
                        predicate.and(Expressions.booleanTemplate("{0} <> {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "greater":
                        predicate.and(Expressions.booleanTemplate("{0} > {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "lesser":
                        predicate.and(Expressions.booleanTemplate("{0} < {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "greaterequal":
                        predicate.and(Expressions.booleanTemplate("{0} >= {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "lesserequal":
                        predicate.and(Expressions.booleanTemplate("{0} <= {1}", campoPath, getTipo(tipoCampo, partes[2])));
                        break;
                    case "like":
                        predicate.and(Expressions.booleanTemplate("{0} like '%'||{1}||'%'", campoPath, Expressions.constant(partes[2])));
                        break;
                    default:
                        throw new ValidationException("Operador " + partes[1] + " não suportado");
                }

            } catch (NoSuchFieldException e) {
                throw new ValidationException("Campo " + partes[0] + " não encontrado");
            } catch (Exception e) {
                throw new ValidationException("Acesso ilegal ao campo " + partes[0]);
            }
        }

        if (partes.length == 4) {
            try {
                Field campo = getFieldRecursivamente(classe, partes[0]);
                campo.setAccessible(true);
                Class<?> tipoCampo = campo.getType();
                PathBuilder<?> campoPath = new PathBuilder<>(tipoCampo, campo.getName());

                switch (partes[1].toLowerCase()) {
                    case "between":
                        predicate.and(Expressions.booleanTemplate("{0} >= {1} AND {0} <= {2}", campoPath, getTipo(tipoCampo, partes[2]), getTipo(tipoCampo, partes[3])));
                        break;
                    default:
                        throw new ValidationException("Operador " + partes[1] + " não suportado");
                }

            } catch (NoSuchFieldException e) {
                throw new ValidationException("Campo " + partes[0] + " não encontrado");
            } catch (Exception e) {
                throw new ValidationException("Acesso ilegal ao campo " + partes[0]);
            }
        }

        return predicate;
    }


    public static Expression getTipo(Class<?> tipoCampo, String parte) {
        if (tipoCampo == Integer.class || tipoCampo == int.class) {
            return Expressions.constant(Integer.parseInt(parte));
        } else if (tipoCampo == Double.class || tipoCampo == double.class) {
            return Expressions.constant(Double.parseDouble(parte));
        } else if (tipoCampo == LocalDate.class) {
            return Expressions.constant(LocalDate.parse(parte));
        } else if (tipoCampo.isEnum()) {
            return Expressions.constant(Enum.valueOf((Class<Enum>) tipoCampo, parte));
        }
        return Expressions.constant(parte);
    }

    private static Field getFieldRecursivamente(Class<?> classe, String nomeCampo) throws NoSuchFieldException {
        try {
            return classe.getDeclaredField(nomeCampo);
        } catch (NoSuchFieldException e) {
            if (classe.getSuperclass() != null) {
                return getFieldRecursivamente(classe.getSuperclass(), nomeCampo);
            } else {
                throw e;
            }
        }
    }

}