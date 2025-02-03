package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.society.dtos.ApiResponse;
import com.society.dtos.ResourceDto;
import com.society.service.ResourceService;

public class ResourceController {

	@Autowired
	private ResourceService resourceService;
	
	@PostMapping("/add-resource")
	public ResponseEntity<?> addResource(@RequestBody ResourceDto dto, Authentication authentication) {
		try {
			String email = authentication.getName();
			System.out.println("Extracted User Email : " + email);
			
			ApiResponse response = resourceService.addResource(dto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
			
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
