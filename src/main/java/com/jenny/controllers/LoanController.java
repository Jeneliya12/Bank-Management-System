package com.jenny.controllers;

import com.jenny.dto.LoanResponseDTO;
import com.jenny.dto.LoanRequestDTO; // New DTO for loan creation
import com.jenny.dto.StatusUpdateRequest;
import com.jenny.entity.Loan;
import com.jenny.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    // Create a new loan
    @PostMapping("/create")
    public ResponseEntity<LoanResponseDTO> createLoan(@Valid @RequestBody LoanRequestDTO loanRequest) {
        // Validate the loan request fields
        if (loanRequest.getAmount() == null || loanRequest.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            return ResponseEntity.badRequest().body(null); // Handle invalid amount
        }
        if (loanRequest.getTerm() == null || loanRequest.getTerm() <= 0) {
            return ResponseEntity.badRequest().body(null); // Handle invalid term
        }
        if (loanRequest.getAnnualInterestRate() == null || loanRequest.getAnnualInterestRate().compareTo(BigDecimal.ZERO) < 0) {
            return ResponseEntity.badRequest().body(null); // Handle invalid interest rate
        }

        // Create a new Loan object
        Loan loan = new Loan();
        loan.setAmount(loanRequest.getAmount());
        loan.setTerm(loanRequest.getTerm());
        loan.setPurpose(loanRequest.getPurpose());
        loan.setLoanType(loanRequest.getLoanType());
        loan.setAnnualInterestRate(loanRequest.getAnnualInterestRate());
        loan.setApplicationDate(new Date());
        loan.setStatus("PENDING");

        // Calculate the monthly payment
        BigDecimal monthlyPayment = loanService.calculateMonthlyPayment(
                loanRequest.getAmount(),
                loanRequest.getAnnualInterestRate(),
                loanRequest.getTerm()
        );

        LoanResponseDTO createdLoan = loanService.saveLoan(loan);
        createdLoan.setMonthlyPayment(monthlyPayment);

        return ResponseEntity.ok(createdLoan);
    }

    // Get a loan by its ID
    @GetMapping("/{id}")
    public ResponseEntity<LoanResponseDTO> getLoanById(@PathVariable Long id) {
        Optional<LoanResponseDTO> loan = loanService.getLoanById(id);
        return loan.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all loans
    @GetMapping("/all")
    public ResponseEntity<List<LoanResponseDTO>> getAllLoans() {
        List<LoanResponseDTO> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }

    // Get loans by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LoanResponseDTO>> getLoansByUserId(@PathVariable Long userId) {
        List<LoanResponseDTO> loans = loanService.getLoansByUserId(userId);
        return ResponseEntity.ok(loans);
    }

    // Update loan status
    @PutMapping("/{id}/status")
    public ResponseEntity<LoanResponseDTO> updateLoanStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest statusUpdateRequest) {
        LoanResponseDTO updatedLoan = loanService.updateLoanStatus(id, statusUpdateRequest.getStatus());
        return ResponseEntity.ok(updatedLoan);
    }

}
