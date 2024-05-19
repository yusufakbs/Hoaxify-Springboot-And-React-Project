package com.hoaxify.ws.entity.validation;

import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        User inDb = userRepository.findByEmail(value);
        return inDb == null;
    }
}
