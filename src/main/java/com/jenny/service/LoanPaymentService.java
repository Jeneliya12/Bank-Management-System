package com.jenny.service;

import com.jenny.dto.LoanPaymentRequest;
import com.jenny.entity.Loan;
import com.jenny.entity.Payment;
import com.jenny.repository.LoanRepository;
import com.jenny.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;

@Service
public class LoanPaymentService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Transactional // Start a transaction
    public void makePayment(Long loanId, LoanPaymentRequest paymentRequest) {
        // Find the loan
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Loan not found"));

        // Update the loan balance
        BigDecimal newBalance = loan.getAmount().subtract(paymentRequest.getAmount());
        loan.setAmount(newBalance);
        loanRepository.save(loan); // Save the updated loan

        // Create a new payment record
        Payment payment = new Payment();
        payment.setLoanId(loanId);
        payment.setAmount(paymentRequest.getAmount());
        payment.setPaymentDate(new Date());
        paymentRepository.save(payment);

    }
}
