package com.hoaxify.ws.configuration;

import com.hoaxify.ws.user.UserService;
import com.hoaxify.ws.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    UserService userService;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User inDB = userService.findByEmail(email);
        if (inDB == null) {
            throw new UsernameNotFoundException(email + " not found");
        }
        return new CurrentUser(inDB);
    }
}
