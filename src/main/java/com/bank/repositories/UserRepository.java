package com.bank.repositories;

import com.bank.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findUsersByName(String userName);
}
