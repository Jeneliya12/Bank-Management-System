package com.jenny.controllers;

import com.jenny.dto.LoanResponseDTO;
import com.jenny.entity.Loan;
import com.jenny.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanService loanService;

    // Create a new loan
    @PostMapping("/create")
    public ResponseEntity<LoanResponseDTO> createLoan(@Valid @RequestBody Loan loan) {
        LoanResponseDTO createdLoan = loanService.saveLoan(loan);
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
}
