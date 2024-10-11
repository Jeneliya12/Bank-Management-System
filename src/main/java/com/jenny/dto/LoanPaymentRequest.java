package com.jenny.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class LoanPaymentRequest {
    private BigDecimal amount;
}
