package com.bank.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuthenticationService {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Resource(name = "authenticationManager")
    private AuthenticationManager authManager;

    // create account in temporary storage
    private final InMemoryUserDetailsManager inMemoryUserDetailsManager;

    @Autowired
    public AuthenticationService(InMemoryUserDetailsManager inMemoryUserDetailsManager) {
        this.inMemoryUserDetailsManager = inMemoryUserDetailsManager;
    }


    public String getLoggedInUser() {

        List<com.bank.models.User> userList = userService.getAllUsers();
        for (com.bank.models.User user : userList) {
            if (this.inMemoryUserDetailsManager.userExists(user.getName())) {
                return user.getName();
            }

        }
        return null;


    }

    public com.bank.models.User createUser(com.bank.models.User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.addUser(user);
//        inMemoryUserDetailsManager.createUser(new User(user.getName(), passwordEncoder.encode(user.getPassword()), new ArrayList<>()));

        return user;
    }


    public String login(HttpServletRequest request, String username, String password) {

        String status = "fail";
        com.bank.models.User user = userService.getUserByUserName(username);

        if (passwordEncoder.matches(password, user.getPassword())) {
            status = "success";
            if (!inMemoryUserDetailsManager.userExists(username)) {
                inMemoryUserDetailsManager.createUser(new User(username, user.getPassword(), new ArrayList<>()));
            }

        }

        UsernamePasswordAuthenticationToken authReq =
                new UsernamePasswordAuthenticationToken(username, password);
        Authentication auth = authManager.authenticate(authReq);
        SecurityContext sc = SecurityContextHolder.getContext();
        sc.setAuthentication(auth);
        HttpSession session = request.getSession(true);
        session.setAttribute("SPRING_SECURITY_CONTEXT", sc);


        return status;
    }

    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
