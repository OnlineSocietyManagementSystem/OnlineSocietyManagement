package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventResponseDto;
import com.society.dtos.SocietyDto;
import com.society.dtos.SocietyResponseDto;
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
	
	@GetMapping("/get-society")
	public ResponseEntity<?> getSocietyDetails() {
		try {
			List<SocietyResponseDto> society = societyService.getSocietyDetails();
			if (society.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(society);
			}

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete-society/{societyId}")
	public ResponseEntity<?> deleteSociety(@PathVariable Long societyId, Authentication authentication) {
		try {
			String email = authentication.getName();
			ApiResponse response = societyService.deleteSociety(societyId, email);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}


}
