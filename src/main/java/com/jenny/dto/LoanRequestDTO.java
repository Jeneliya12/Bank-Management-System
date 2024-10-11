package com.jenny.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanRequestDTO {
    private BigDecimal amount;
    private Integer term;
    private String purpose;
    private String loanType;
    private BigDecimal annualInterestRate;
    private Long userId;
}
