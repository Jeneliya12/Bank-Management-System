package com.jenny.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data // This will generate getters, setters, toString, equals, and hashCode methods
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Ensure amount is not null
    private String amount;

    @Column(nullable = false) // Ensure term is not null
    private String term;

    @Column(nullable = false) // Ensure purpose is not null
    private String purpose;

    @Column(nullable = false) // Ensure loan type is not null
    private String loanType;

    @Column(nullable = false) // Ensure application date is not null
    @Temporal(TemporalType.TIMESTAMP) // Specify that it's a timestamp
    private Date applicationDate;

    @Column(nullable = false) // Ensure status is not null
    private String status = "PENDING"; // Default status is "PENDING"
}
