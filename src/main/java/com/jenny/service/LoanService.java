package com.jenny.service;

import com.jenny.dto.LoanResponseDTO;
import com.jenny.entity.Loan;
import com.jenny.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
