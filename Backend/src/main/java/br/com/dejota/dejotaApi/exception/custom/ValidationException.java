package br.com.dejota.dejotaApi.exception.custom;

public class ValidationException extends RuntimeException {

    public ValidationException(String message) {
        super(message);
    }
}
