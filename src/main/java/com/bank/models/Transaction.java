package com.bank.models;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Transaction")
public class Transaction {

    private long id;
    private long accountId;
    private String description;
    private double amount;
    private Date date;
    private String transactionType;
    private double balance;

    public Transaction() {
    }

    public Transaction(long id, String description, double amount, Date date, String transactionType) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.date = date;
        this.transactionType = transactionType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "accountId", nullable = false)
    public long getAccountId() {
        return accountId;
    }

    public void setAccountId(long accountId) {
        this.accountId = accountId;
    }

    @Column(name = "description", nullable = false)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(name = "amount", nullable = false)
    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    @Column(name = "transcationType", nullable = false)
    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    @Column(name = "balance", nullable = false)
    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
