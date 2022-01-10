package com.bank.controllers;

import com.bank.exceptions.ResourceNotFoundException;
import com.bank.models.Account;
import com.bank.models.Transaction;
import com.bank.models.User;
import com.bank.repositories.AccountRepository;
import com.bank.repositories.TransactionRepository;
import com.bank.services.AuthenticationService;
import com.bank.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AccountController {
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    UserService userService;
    @Autowired
    private AccountRepository accountRepository;


    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/accounts")
    public List<Account> getAllAccounts() {
        return (List<Account>) accountRepository.findAll();
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<Account> getAccountById(@PathVariable(value = "id") final Long accountId) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account not for for this id :: " + accountId));
        return ResponseEntity.ok().body(account);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getTransactionsByUser() throws ResourceNotFoundException {
        String user = authenticationService.getLoggedInUser();
        User user1 = userService.getUserByUserName(user);
        Account account = accountRepository.getAccountByUserId(user1.getId());
        if(account==null){
            new ResourceNotFoundException("Account is not available for this id: " + user1.getId());
        }
        List<Transaction> transactions = transactionRepository.getTransactionsByAccountId(account.getId());
        return ResponseEntity.ok().body(transactions);
    }

    @RequestMapping("/addaccount")
    public Account createAccount(@RequestParam("userId") long userId, @RequestParam("balance") Double balance) {
        List<Account> accounts = accountRepository.findAll();
        List<Account> userAccounts = accounts.stream().filter(account1 -> account1.getUserId() == userId).collect(Collectors.toList());
        if (userAccounts.size() > 0) {
            System.out.println("an account has found for userID " + userId);
            return null;
        }
        Account account = new Account();
        account.setBalance(balance);
        account.setUserId(userId);
        return accountRepository.save(account);
    }

    @RequestMapping(value = "/depositmoney")
    public Account depositMoney(@RequestParam(value = "accountId") long accountId, @RequestParam("amount") double amount) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account is not available for this id : " + accountId));
        double initialBalance = account.getBalance();
        account.setBalance(initialBalance + amount);

        Transaction transaction = new Transaction();
        transaction.setAccountId(accountId);
        transaction.setDescription("testing");
        transaction.setAmount(amount);
        transaction.setTransactionType("Deposit");
        Date date = java.util.Calendar.getInstance().getTime();
        transaction.setDate(date);
        transaction.setBalance(account.getBalance());
        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }

    @RequestMapping(value = "/withdrawmoney")
    public Account withdrawMoney(@RequestParam(value = "accountId") long accountId, @RequestParam("amount") double amount) throws ResourceNotFoundException {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new ResourceNotFoundException("Account is not available for this id: " + accountId));
        double initialBalance = account.getBalance();
        if (amount > initialBalance) {
            System.out.println("Withdrawal amount exceeded");
            return null;
        }
        account.setBalance(initialBalance - amount);

        Transaction transaction = new Transaction();
        transaction.setAccountId(accountId);
        transaction.setDescription("testing");
        transaction.setAmount(amount);
        transaction.setTransactionType("Withdraw");
        Date date = java.util.Calendar.getInstance().getTime();
        transaction.setDate(date);
        transaction.setBalance(account.getBalance());
        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }


}
