package com.hoaxify.ws.auth.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoaxify.ws.auth.dto.Credentials;
import com.hoaxify.ws.user.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
@ConditionalOnProperty(name = "hoaxify.token-type", havingValue = "jwt")
public class JwtTokenService implements TokenService {

    SecretKey key = Keys.hmacShaKeyFor("secret-must-be-at-least-32-chars".getBytes());

    ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Token createToken(User user, Credentials credentials) {
        TokenSubject tokenSubject = new TokenSubject(user.getId(), user.isActive());
        try {
            String subject = objectMapper.writeValueAsString(tokenSubject);
            String token = Jwts.builder().setSubject(subject).signWith(key).compact();
            return new Token("Bearer", token);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if (authorizationHeader != null) {
            var token = authorizationHeader.split("Bearer ")[1];
            JwtParser parser = Jwts.parserBuilder().setSigningKey(key).build();
            try {
                Jws<Claims> claims = parser.parseClaimsJws(token);
                var subject = claims.getBody().getSubject();
                var tokenSubject = objectMapper.readValue(subject, TokenSubject.class);
                User user = new User();
                user.setId(tokenSubject.id());
                user.setActive(tokenSubject.active());
                return user;
            } catch (JwtException | JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Override
    public void logout(String authorizationHeader) {

    }

    public static record TokenSubject(long id, boolean active) {
    }


}
