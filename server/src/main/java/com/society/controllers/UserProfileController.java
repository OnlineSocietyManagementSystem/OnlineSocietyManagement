package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.ProfileDto;
import com.society.service.UserService;

@RestController
public class UserProfileController {
	
	@Autowired
	private UserService  userService;
	
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody ProfileDto dto, Authentication authentication) {
	    String email = authentication.getName(); // Get the logged-in user's email
	    ApiResponse response = userService.updateProfile(dto,email);
	    return ResponseEntity.ok(response);
	}


}
