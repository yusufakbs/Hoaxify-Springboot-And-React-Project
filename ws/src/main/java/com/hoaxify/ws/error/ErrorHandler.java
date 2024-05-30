package com.hoaxify.ws.error;

import com.hoaxify.ws.auth.exception.AuthenticationException;
import com.hoaxify.ws.email.exception.ActivationNotificationException;
import com.hoaxify.ws.email.exception.InvalidTokenException;
import com.hoaxify.ws.shared.Messages;
import com.hoaxify.ws.user.exception.AuthorizationException;
import com.hoaxify.ws.user.exception.NotFoundException;
import com.hoaxify.ws.user.exception.NotUniqueEmailException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class ErrorHandler {


    @ExceptionHandler({MethodArgumentNotValidException.class, NotUniqueEmailException.class, ActivationNotificationException.class, InvalidTokenException.class, NotFoundException.class, AuthenticationException.class, AuthorizationException.class})
    ResponseEntity<ApiError> handleMethodArgumentNotValidException(Exception exception, HttpServletRequest request) {
        ApiError apiError = new ApiError();
        apiError.setPath(request.getRequestURI());
        apiError.setMessage(exception.getMessage());
        if (exception instanceof MethodArgumentNotValidException) {
            String message = Messages.getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale());
            apiError.setMessage(message);
            apiError.setStatus(400);
            //            Map<String, String> validationErrors = new HashMap<>();
            //            for(var fieldError: ex.getBindingResult().getFieldErrors()) {
            //            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
            //            }
            var validationErrors = ((MethodArgumentNotValidException) exception).getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> replacing));
            apiError.setValidationErrors(validationErrors);
        } else if (exception instanceof NotUniqueEmailException) {
            apiError.setStatus(400);
            apiError.setValidationErrors(((NotUniqueEmailException) exception).getValidationErrors());
        } else if (exception instanceof ActivationNotificationException) {
            apiError.setStatus(502);
        } else if (exception instanceof InvalidTokenException) {
            apiError.setStatus(400);
        } else if (exception instanceof NotFoundException) {
            apiError.setStatus(404);
        } else if (exception instanceof AuthenticationException) {
            apiError.setStatus(401);
        }else if (exception instanceof AuthorizationException) {
            apiError.setStatus(403);
        }

        return ResponseEntity.status(apiError.getStatus()).body(apiError);
    }

}


//    @ExceptionHandler
//    ResponseEntity<ApiError> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
//        ApiError apiError = new ApiError();
//        apiError.setPath(request.getRequestURI());
//        String message = Messages.getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale());
//        apiError.setMessage(message);
//        apiError.setStatus(400);
////        Map<String, String> validationErrors = new HashMap<>();
////        for(var fieldError: ex.getBindingResult().getFieldErrors()) {
////            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
////        }
//        var validationErrors = ex.getBindingResult().getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> replacing));
//        apiError.setValidationErrors(validationErrors);
//        return ResponseEntity.badRequest().body(apiError);
//    }
//
//    @ExceptionHandler(NotUniqueEmailException.class)
//    ResponseEntity<ApiError> handeNotUniqueEmailException(NotUniqueEmailException exception) {
//        ApiError apiError = new ApiError();
//        apiError.setPath("/api/v1/users");
//        apiError.setMessage(exception.getMessage());
//        apiError.setStatus(400);
//        apiError.setValidationErrors(exception.getValidationErrors());
//        return ResponseEntity.status(400).body(apiError);
//    }
//
//    @ExceptionHandler(ActivationNotificationException.class)
//    ResponseEntity<ApiError> handleActivationNotificationException(ActivationNotificationException exception) {
//        ApiError apiError = new ApiError();
//        apiError.setPath("/api/v1/users");
//        apiError.setMessage(exception.getMessage());
//        apiError.setStatus(502);
//        return ResponseEntity.status(502).body(apiError);
//    }
//
//    @ExceptionHandler(InvalidTokenException.class)
//    ResponseEntity<ApiError> handleInvalidTokenException(InvalidTokenException exception, HttpServletRequest request) {
//        ApiError apiError = new ApiError();
//        apiError.setPath(request.getRequestURI());
//        apiError.setMessage(exception.getMessage());
//        apiError.setStatus(400);
//        return ResponseEntity.status(400).body(apiError);
//    }
//
//    @ExceptionHandler(NotFoundException.class)
//    ResponseEntity<ApiError> handleEntityNotFoundException(NotFoundException exception, HttpServletRequest request) {
//        ApiError apiError = new ApiError();
//        apiError.setPath(request.getRequestURI());
//        apiError.setMessage(exception.getMessage());
//        apiError.setStatus(404);
//        return ResponseEntity.status(404).body(apiError);
//    }
//
//    @ExceptionHandler(AuthenticationException.class)
//    ResponseEntity<?> handleAuthenticationException(AuthenticationException exception){
//        ApiError error = new ApiError();
//        error.setPath("/api/v1/auth");
//        error.setMessage(exception.getMessage());
//        error.setStatus(401);
//        return ResponseEntity.status(401).body(error);
//    }

