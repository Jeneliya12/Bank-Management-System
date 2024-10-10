package com.jenny.repository;

import com.jenny.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Method to find a user by their email
    Optional<User> findByEmail(String email);

    // Method to check if a user exists by their email
    boolean existsByEmail(String email);
}
