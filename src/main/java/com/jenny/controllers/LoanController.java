package com.jenny.controllers;

import com.jenny.entity.Loan;
import com.jenny.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanRepository loanRepository;

    // Endpoint to get all loan applications
    @GetMapping
    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    // Endpoint to create a new loan application
    @PostMapping
    public ResponseEntity<Loan> createLoan(@RequestBody Loan loan) {
        Loan savedLoan = loanRepository.save(loan);
        return new ResponseEntity<>(savedLoan, HttpStatus.CREATED);
    }

    // Endpoint to get pending loans
    @GetMapping("/pending")
    public ResponseEntity<List<Loan>> getPendingLoans() {
        List<Loan> loans = loanRepository.findByStatus("PENDING"); // Assuming "PENDING" is the status for pending loans
        return ResponseEntity.ok(loans);
    }

    // Endpoint to approve a loan
    @PatchMapping("/{loanId}/approve")
    public ResponseEntity<Loan> approveLoan(@PathVariable Long loanId) {
        Optional<Loan> optionalLoan = loanRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();
            loan.setStatus("APPROVED"); // Update status to APPROVED
            Loan updatedLoan = loanRepository.save(loan);
            return ResponseEntity.ok(updatedLoan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Endpoint to reject a loan
    @PatchMapping("/{loanId}/reject")
    public ResponseEntity<Loan> rejectLoan(@PathVariable Long loanId) {
        Optional<Loan> optionalLoan = loanRepository.findById(loanId);
        if (optionalLoan.isPresent()) {
            Loan loan = optionalLoan.get();
            loan.setStatus("REJECTED"); // Update status to REJECTED
            Loan updatedLoan = loanRepository.save(loan);
            return ResponseEntity.ok(updatedLoan);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status")
    public ResponseEntity<List<Loan>> getLoanStatus() {
        List<Loan> loans = loanRepository.findAll();
        return ResponseEntity.ok(loans);
    }
}
