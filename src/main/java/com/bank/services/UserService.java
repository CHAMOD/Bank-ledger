package com.bank.services;


import com.bank.models.User;
import com.bank.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserByUserName(String userName) {
        Optional<User> optionalUser = Optional.ofNullable(userRepository.findUsersByName(userName));
        User user;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            return user;
        }
        return null;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }
}
