package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;
import com.society.service.PaymentServiceImpl;

import io.jsonwebtoken.io.IOException;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
public class PaymentController {
	@Autowired
    private PaymentServiceImpl paymentServiceImpl;

    @PostMapping("/payment")
    public ResponseEntity<?> makePayment(@RequestBody PaymentDto paymentDto, Authentication authentication) {
   	 try {
            String email = authentication.getName();
            // Extract logged-in user's email
            System.out.println(paymentDto);
           ApiResponse response = paymentServiceImpl.makePayment(paymentDto, email);
             System.out.println(paymentDto.getAmount()+" "+paymentDto.getPaymentType());
           
             return ResponseEntity.status(HttpStatus.CREATED).body(response);
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
         }
     }
	
	
	
//	@PostMapping("/payment")
//    public ResponseEntity<?> makePayment(@RequestBody String requestBody, Authentication authentication) {
//        System.out.println("Raw JSON Received: " + requestBody);  // ✅ Print raw JSON before mapping
//
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            PaymentDto paymentDto = objectMapper.readValue(requestBody, PaymentDto.class);  // Manually map JSON to DTO
//
//            System.out.println("Parsed DTO: " + paymentDto); // ✅ Print parsed object
//
//            String email = authentication.getName();
//            ApiResponse response = paymentServiceImpl.makePayment(paymentDto, email);
//            return ResponseEntity.status(HttpStatus.CREATED).body(response);
//        } catch (IOException | JsonProcessingException e) {
//            return ResponseEntity.badRequest().body("Invalid JSON format: " + e.getMessage());
//        }
    }
	
//	public ResponseEntity<?> makePayment(@RequestBody(required = false) PaymentDto paymentDto, Authentication authentication) {
//	    if (paymentDto == null) {
//	        return ResponseEntity.badRequest().body("Request body is missing or empty!");
//	    }
//
//	    System.out.println("Parsed DTO: " + paymentDto); // Debugging
//	    String email = authentication.getName();
//
//	    ApiResponse response = paymentServiceImpl.makePayment(paymentDto, email);
//	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
//	}



