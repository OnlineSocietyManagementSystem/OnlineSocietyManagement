package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.society.dtos.ApiResponse;
import com.society.dtos.MakePaymentDto;
import com.society.dtos.MyPaymentResDto;
import com.society.dtos.PaymentDto;
import com.society.dtos.PaymentResDto;
import com.society.service.PaymentServiceImpl;

import io.jsonwebtoken.io.IOException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PaymentController {
	@Autowired
    private PaymentServiceImpl paymentServiceImpl;

    @PostMapping("/add-payment")
    public ResponseEntity<?> addPayment(@RequestBody PaymentDto paymentDto,Authentication authentication) {
   	 try { 
   		      String email = authentication.getName();
   		 
           ApiResponse response = paymentServiceImpl.addPayment(paymentDto,email);
             System.out.println(paymentDto.getAmount()+" "+paymentDto.getPaymentType());
             return ResponseEntity.status(HttpStatus.CREATED).body(response);
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
         }
    }
    
    @GetMapping("/get-unpaidpayment")
    public ResponseEntity<List<PaymentResDto>> getPayment(Authentication authentication) 
    {
      		  String email = authentication.getName();
              List<PaymentResDto> payments= paymentServiceImpl.getPayment(email);
              return ResponseEntity.ok(payments);   
}
    @PostMapping("/make-payment")
    public ResponseEntity<?> makePayment(Authentication authentication) {
   	 try { 
   		      String email = authentication.getName();
   		 
           ApiResponse response = paymentServiceImpl.makePayment(email);
             return ResponseEntity.ok(response);
         } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
         }
    }
    
      @GetMapping("/my-payments")
      public ResponseEntity<List<MyPaymentResDto>> getMyPayment(Authentication authentication) 
      {
        		  String email = authentication.getName();
                List<MyPaymentResDto> payments= paymentServiceImpl.getMyPayment(email);
                return ResponseEntity.ok(payments);   
  }
      
    
    
    
}
	
	
	


