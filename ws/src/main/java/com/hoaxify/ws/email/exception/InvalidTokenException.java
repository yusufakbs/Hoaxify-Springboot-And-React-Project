package com.hoaxify.ws.email.exception;

import com.hoaxify.ws.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class InvalidTokenException extends RuntimeException {
    public InvalidTokenException() {
        super(Messages.getMessageForLocale("hoaxify.activate.user.invalid.token", LocaleContextHolder.getLocale()));
    }
}
