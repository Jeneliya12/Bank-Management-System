package com.jenny.controllers;

import com.jenny.entity.User;
import com.jenny.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return createErrorResponse(HttpStatus.BAD_REQUEST, "Email and password are required.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return createErrorResponse(HttpStatus.CONFLICT, "User already exists.");
        }

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        User savedUser = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("id", savedUser.getId());
        response.put("email", savedUser.getEmail());
        response.put("role", savedUser.getRole());
        response.put("message", "User registered successfully.");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Optional<User> existingUserOpt = userRepository.findByEmail(user.getEmail());

        if (existingUserOpt.isEmpty() || !passwordEncoder.matches(user.getPassword(), existingUserOpt.get().getPassword())) {
            return createErrorResponse(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
        }

        User existingUser = existingUserOpt.get();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login Successful");
        response.put("role", existingUser.getRole());

        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<Map<String, Object>> handleException(Exception e) {
        logger.error("An error occurred: ", e);
        return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred: " + e.getMessage());
    }

    private ResponseEntity<Map<String, Object>> createErrorResponse(HttpStatus status, String message) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", message);
        return ResponseEntity.status(status).body(errorResponse);
    }
}
