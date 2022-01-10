package com.bank.controllers;

import com.bank.dtos.LoginUser;
import com.bank.models.User;
import com.bank.repositories.UserRepository;
import com.bank.services.AuthenticationService;
import com.bank.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationService authenticationService;

//    @PostMapping("/login")
//    public ResponseEntity<Void> login(@RequestBody LoginUser loginAccountRequest, final HttpServletRequest request) {
//
//        authenticationService.login(request, loginAccountRequest.getName(), loginAccountRequest.getPassword());
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping("/login")
    public ResponseEntity<String> createPromoter(@RequestBody LoginUser loginUser, final HttpServletRequest request) {
        String status = authenticationService.login(request, loginUser.getName(), loginUser.getPassword());

        if (status.equals("success")) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/logout")
    public ResponseEntity<Void> logout() {
        authenticationService.logout();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }

    @GetMapping("/users/{userName}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "userName") final String userName) {
        Optional<User> optionalUser = Optional.ofNullable(userService.getUserByUserName(userName));
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            user.setPassword("");
            return ResponseEntity.ok().body(user);
        }
        return null;
    }


    @RequestMapping("/adduser")
    public User createUser(@RequestParam("name") String name, @RequestParam("password") String password, @RequestParam("role") String role) {
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        user.setRole(role);
        return authenticationService.createUser(user);
    }

}
