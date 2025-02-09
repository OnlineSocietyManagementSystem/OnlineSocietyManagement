package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.GuardDto;
import com.society.service.GuardService;

import jakarta.validation.Valid;

@RestController
public class GuardController {
	
	@Autowired
	private GuardService guardService;
	
	@PostMapping("/add-guard")
	public ResponseEntity<?> addGuard(@RequestBody @Valid GuardDto guardDto, Authentication authentication) {
		try {

			String email = authentication.getName();
			ApiResponse response = guardService.addGuard(guardDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}

	}
 
}
