package com.bank.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidTransactionException extends Exception {
    public InvalidTransactionException(String message) {
        super(message);
    }
}
