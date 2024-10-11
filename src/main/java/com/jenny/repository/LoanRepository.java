package com.jenny.repository;

import com.jenny.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    // Custom method to find loans by user ID
    List<Loan> findByUserId(Long userId);
}
