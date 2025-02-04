package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.BookingDto;
import com.society.dtos.BookingRespDto;
import com.society.dtos.EventResponseDto;
import com.society.service.BookingService;

import jakarta.validation.Valid;


@RestController

public class BookingController {

	
	@Autowired
	private BookingService bookingService;
	
	@PostMapping("/add-booking")
	public ResponseEntity<?> addBooking(@RequestBody @Valid BookingDto bookingDto, Authentication authentication) {
		try {

			String email = authentication.getName();
			ApiResponse response = bookingService.addBooking(bookingDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}

	}
	
	@GetMapping("/all-bookings")
	public ResponseEntity<?> getAllBookings(Authentication authentication) {
		try {
			String email = authentication.getName();
			List<BookingRespDto> bookings = bookingService.getAllBookings(email);
			if (bookings.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(bookings);
			}

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
}
