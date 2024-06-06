package com.hoaxify.ws.user.entity.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = FileTypeValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface FileType {
    String message() default "Only {types} allowed";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String[] types();
}
