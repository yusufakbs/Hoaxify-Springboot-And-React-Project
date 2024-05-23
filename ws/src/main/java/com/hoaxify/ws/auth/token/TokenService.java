package com.hoaxify.ws.auth.token;

import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.user.entity.User;

public interface TokenService {
    public Token createToken(User user, Credentials credentials);

    public User verifyToken(String authorizationHeader);
}
