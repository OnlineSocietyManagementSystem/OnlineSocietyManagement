package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import com.society.service.PaymentService;
import com.society.service.PaymentServiceImpl;

import io.jsonwebtoken.io.IOException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

	@PostMapping("/add-payment")
	public ResponseEntity<?> addPayment(@RequestBody PaymentDto paymentDto, Authentication authentication) {
		try {
			String email = authentication.getName();

			ApiResponse response = paymentService.addPayment(paymentDto, email);
			System.out.println(paymentDto.getAmount() + " " + paymentDto.getPaymentType());
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/get-unpaidpayment")
	public ResponseEntity<List<PaymentResDto>> getPayment(Authentication authentication) {
		String email = authentication.getName();
		List<PaymentResDto> payments = paymentService.getPayment(email);
		return ResponseEntity.ok(payments);
	}
	@PutMapping("/make-payment/{id}")
	public ResponseEntity<?> makePayment(@PathVariable Long id, Authentication authentication) {
	    try {
	        String email = authentication.getName();
	        ApiResponse response = paymentService.makePayment(id, email);
	        return ResponseEntity.ok(response);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	    }
	}


	@GetMapping("/my-payments")
	public ResponseEntity<List<MyPaymentResDto>> getMyPayment(Authentication authentication) {
		String email = authentication.getName();
		List<MyPaymentResDto> payments = paymentService.getMyPayment(email);
		return ResponseEntity.ok(payments);
	}

	@GetMapping("/all-payments")
	public ResponseEntity<List<PaymentResDto>> getAllPayments(Authentication authentication) {
		try {
			String adminEmail = authentication.getName();
			List<PaymentResDto> payments = paymentService.getAllPayments(adminEmail);
			return ResponseEntity.ok(payments);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

}
