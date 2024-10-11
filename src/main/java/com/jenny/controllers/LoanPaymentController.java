package com.jenny.controllers;

import com.jenny.dto.LoanPaymentRequest;
import com.jenny.service.LoanPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loan-payments")
public class LoanPaymentController {

    @Autowired
    private LoanPaymentService loanPaymentService;

    @PostMapping("/{loanId}")
    public ResponseEntity<String> makePayment(
            @PathVariable Long loanId,
            @RequestBody LoanPaymentRequest paymentRequest) {
        try {
            loanPaymentService.makePayment(loanId, paymentRequest);
            return ResponseEntity.ok("Payment successful");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
