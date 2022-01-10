package com.bank.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AccountInvalidException extends Exception {
    public AccountInvalidException(String message) {
        super(message);
    }
}
