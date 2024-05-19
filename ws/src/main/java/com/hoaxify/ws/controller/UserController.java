package com.hoaxify.ws.controller;

import com.hoaxify.ws.entity.User;
import com.hoaxify.ws.exception.ApiError;
import com.hoaxify.ws.exception.NotUniqueEmailException;
import com.hoaxify.ws.service.UserService;
import com.hoaxify.ws.shared.GenericMessage;
import com.hoaxify.ws.shared.Messages;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/api/v1/users")
    GenericMessage createUser(@Valid @RequestBody User user) {
        userService.save(user);
        String message = Messages.getMessageForLocale("hoaxify.create.user.success.message", LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @ExceptionHandler
    ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        String message = Messages.getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale());
        apiError.setMessage(message);
        apiError.setStatus(400);
//        Map<String, String> validationErrors = new HashMap<>();
//        for(var fieldError: ex.getBindingResult().getFieldErrors()) {
//            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
//        }
        var validationErrors = ex.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> replacing));
        apiError.setValidationErrors(validationErrors);
        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    ResponseEntity<ApiError> handeNotUniqueEmailException(NotUniqueEmailException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());
        return ResponseEntity.badRequest().body(apiError);
    }


}
