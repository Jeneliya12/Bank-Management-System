package com.jenny.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal amount; // Changed to BigDecimal for monetary value

    @Column(nullable = false)
    private Integer term; // Changed to Integer for term in months

    @Column(nullable = false)
    private String purpose;

    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date applicationDate; // Will receive from the customer

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private BigDecimal annualInterestRate; // New field for the annual interest rate

    // Optional: Store monthly payment in the database if needed
    private BigDecimal monthlyPayment; // Optional, only if you want to persist this value

    // Many loans can belong to one user
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
