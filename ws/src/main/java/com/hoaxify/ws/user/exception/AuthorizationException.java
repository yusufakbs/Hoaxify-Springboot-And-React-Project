package com.hoaxify.ws.user.exception;

import com.hoaxify.ws.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthorizationException extends RuntimeException {
    public AuthorizationException() {
        super(Messages.getMessageForLocale("hoaxify.error.authorization", LocaleContextHolder.getLocale()));
    }
}
