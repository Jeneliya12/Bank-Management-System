package com.jenny.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class LoanResponseDTO {
    private Long id;
    private BigDecimal amount; // Changed to BigDecimal
    private Integer term; // Changed to Integer
    private String purpose;
    private String loanType;
    private Date applicationDate;
    private String status;
    private UserDTO user;

    @Data
    public static class UserDTO {
        private Long id;
        private String email;
    }
}
