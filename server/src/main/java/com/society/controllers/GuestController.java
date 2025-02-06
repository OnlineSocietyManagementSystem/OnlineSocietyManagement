package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.GuestDto;
import com.society.dtos.GuestVerificationRequestDTO;

import com.society.service.GuestService;

@RestController
public class GuestController {

	 @Autowired
	    private GuestService guestService;
	 
	  @PostMapping("/add-guest")
	 
	    public  ResponseEntity<?> addGuest(@RequestBody GuestDto guestDTO, Authentication authentication) {
		  try {
			  String email = authentication.getName();
		  ApiResponse response = guestService.addGuest(guestDTO,email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
	    } catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
	    }
	  }
	 
	 @PostMapping("/request-approval")
	    public String requestApproval(@RequestBody GuestVerificationRequestDTO request) {
	        return guestService.requestGuestApproval(request);
	    }
	 
	 @PostMapping("/approve-entry/{entryId}")
	    public String approveEntry(@PathVariable Long entryId, @RequestParam boolean isApproved) {
	        return guestService.approveGuestEntry(entryId, isApproved);
	    }
	 
}
