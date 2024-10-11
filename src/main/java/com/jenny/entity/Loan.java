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
    private BigDecimal amount;

    @Column(nullable = false)
    private Integer term;

    @Column(nullable = false)
    private String purpose;

    @Column(nullable = false)
    private String loanType;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date applicationDate = new Date();

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private BigDecimal annualInterestRate;

    private BigDecimal monthlyPayment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
