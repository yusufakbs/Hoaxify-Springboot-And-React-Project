package com.hoaxify.ws.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hoaxify.ws.auth.token.Token;
import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name = "tbl_users", uniqueConstraints = @UniqueConstraint(columnNames = {"email"}))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @JsonIgnore //Ignores fields that we do not want to be returned in the rotating response
    private String password;

    private String email;

    @Lob
    private String image;

    @JsonIgnore
    private boolean active = false;

    @JsonIgnore
    private String activationToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    List<Token> tokens;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getActivationToken() {
        return activationToken;
    }

    public void setActivationToken(String activationToken) {
        this.activationToken = activationToken;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public void setTokens(List<Token> tokens) {
        this.tokens = tokens;
    }
}
