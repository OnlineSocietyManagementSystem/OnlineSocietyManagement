package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.GuestNotificationDto;
import com.society.dtos.ProfileDto;
import com.society.service.GuestNotificationService;
import com.society.service.UserService;

import jakarta.validation.Valid;

@RestController
public class UserProfileController {
	
	@Autowired
	private UserService  userService;
	
	@Autowired
	private GuestNotificationService guestNotificationService;
	
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@Valid @RequestBody ProfileDto dto, Authentication authentication) {
	    String email = authentication.getName(); // Get the logged-in user's email
	    ApiResponse response = userService.updateProfile(dto,email);
	    return ResponseEntity.ok(response);
	}

	 @GetMapping("/my-profile")
	    public ResponseEntity<?> getProfile(Authentication authentication) {
	        String email = authentication.getName(); // Get logged-in user's email
	        ProfileDto profileDto = userService.getProfile(email);
	        return ResponseEntity.ok(profileDto);
	    }
	 

}
