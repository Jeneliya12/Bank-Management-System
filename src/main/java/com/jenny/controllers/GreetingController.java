package com.jenny.controllers;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class GreetingController {

    @CrossOrigin(origins = "http://localhost:5173") // Allow only your frontend origin
    @GetMapping("/greeting")
    public String greeting() {
        return "Hello, World! this is jeneliya gurung";
    }
}
