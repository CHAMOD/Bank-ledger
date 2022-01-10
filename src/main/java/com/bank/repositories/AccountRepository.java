package com.bank.repositories;

import com.bank.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Account getAccountByUserId(long userId);
}
