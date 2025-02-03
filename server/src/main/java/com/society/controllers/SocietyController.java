package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;

import com.society.dtos.SocietyDto;
import com.society.service.SocietyService;

import jakarta.validation.Valid;

@RestController
public class SocietyController {
	
	@Autowired
	private SocietyService societyService;
	
	
	@PostMapping("/add-society")
	public ResponseEntity<?> addSociety(@RequestBody @Valid SocietyDto societyDto, Authentication authentication) {
		try {

			String email = authentication.getName();
			// Extract logged-in user's email
//	            System.out.println(eventDto);
			ApiResponse response = societyService.addSociety(societyDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}

	}
	

}
