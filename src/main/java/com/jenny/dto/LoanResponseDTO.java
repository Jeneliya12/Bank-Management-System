package com.jenny.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class LoanResponseDTO {
    private Long id;
    private BigDecimal amount;
    private Integer term;
    private String purpose;
    private String loanType;
    private Date applicationDate;
    private String status;
    private UserDTO user;
    private BigDecimal rate;
    private BigDecimal monthlyPayment;

    @Data
    public static class UserDTO {
        private Long id;
        private String email;
    }
}
