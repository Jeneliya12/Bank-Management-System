package com.jenny.service;

import com.jenny.dto.LoanResponseDTO;
import com.jenny.entity.Loan;
import com.jenny.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    // Convert Loan to LoanResponseDTO
    private LoanResponseDTO convertToDTO(Loan loan) {
        LoanResponseDTO loanDTO = new LoanResponseDTO();
        loanDTO.setId(loan.getId());
        loanDTO.setAmount(loan.getAmount());
        loanDTO.setTerm(loan.getTerm());
        loanDTO.setPurpose(loan.getPurpose());
        loanDTO.setLoanType(loan.getLoanType());
        loanDTO.setApplicationDate(loan.getApplicationDate());
        loanDTO.setStatus(loan.getStatus());

        LoanResponseDTO.UserDTO userDTO = new LoanResponseDTO.UserDTO();
        userDTO.setId(loan.getUser().getId());
        userDTO.setEmail(loan.getUser().getEmail()); // Only include email and ID
        loanDTO.setUser(userDTO);

        return loanDTO;
    }

    // Loan calculation method
    public BigDecimal calculateMonthlyPayment(BigDecimal amount, BigDecimal annualInterestRate, Integer term) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Loan amount must be greater than zero.");
        }
        if (annualInterestRate.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Annual interest rate cannot be negative.");
        }
        if (term <= 0) {
            throw new IllegalArgumentException("Term must be greater than zero.");
        }

        // Monthly interest rate
        BigDecimal monthlyInterestRate = annualInterestRate.divide(BigDecimal.valueOf(100), MathContext.DECIMAL128).divide(BigDecimal.valueOf(12), MathContext.DECIMAL128);

        if (monthlyInterestRate.compareTo(BigDecimal.ZERO) == 0) {
            // If the interest rate is zero, return simple division
            return amount.divide(BigDecimal.valueOf(term), MathContext.DECIMAL128);
        } else {
            // Calculate monthly payment using the formula for amortizing loans
            BigDecimal denominator = BigDecimal.ONE.subtract(BigDecimal.ONE.add(monthlyInterestRate).pow(-term));
            return amount.multiply(monthlyInterestRate).divide(denominator, MathContext.DECIMAL128);
        }
    }


    public LoanResponseDTO saveLoan(Loan loan) {
        Loan savedLoan = loanRepository.save(loan);
        return convertToDTO(savedLoan);
    }

    public Optional<LoanResponseDTO> getLoanById(Long id) {
        Optional<Loan> loan = loanRepository.findById(id);
        return loan.map(this::convertToDTO);
    }

    public List<LoanResponseDTO> getAllLoans() {
        return loanRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<LoanResponseDTO> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public LoanResponseDTO updateLoanStatus(Long id, String status) {
        Loan loan = loanRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Loan not found with id " + id));

        loan.setStatus(status);
        Loan updatedLoan = loanRepository.save(loan);
        return convertToDTO(updatedLoan);
    }
}
