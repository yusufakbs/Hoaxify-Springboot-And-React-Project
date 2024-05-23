package com.hoaxify.ws.user.dto;

import com.hoaxify.ws.user.entity.User;
import com.hoaxify.ws.user.entity.validation.UniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserCreate(
        @NotBlank(message = "{hoaxify.constraint.username.notblank}")
        @Size(min = 4, max = 50)
        String username,
        //Since we encrypt the password with the encoder, we need to pay attention to the size here.
        //This usually corresponds to between 60 and 68 characters.
        @Size(min = 5, max = 70)
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{hoaxify.constraint.password.pattern}")
        String password,

        @NotBlank
        @Email
        @UniqueEmail
        String email) {

    public User toUser() {
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        return user;
    }
}
