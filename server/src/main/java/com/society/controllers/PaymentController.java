package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;
import com.society.service.PaymentServiceImpl;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class PaymentController {
	@Autowired
    private PaymentServiceImpl paymentServiceImpl;

    @PostMapping("/payment")
    public ResponseEntity<?> makePayment(@RequestBody PaymentDto paymentDTO, Authentication authentication) {
    	 try {
             String email = authentication.getName(); // Extract logged-in user's email
             ApiResponse response = paymentServiceImpl.makePayment(paymentDTO, email);
             return ResponseEntity.status(HttpStatus.CREATED).body(response);
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
         }
     }
    
}


