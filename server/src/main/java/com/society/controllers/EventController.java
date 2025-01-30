package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.service.EventService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EventController {
	
	@Autowired
	private EventService eventService;
	
	// admin should be able to add the events
		@PostMapping("/add-event")
		public  ResponseEntity<?> addEvent(@RequestBody @Valid EventDto eventDto, Authentication authentication) {
			try {
				
				String email = authentication.getName();
	            // Extract logged-in user's email
//	            System.out.println(eventDto);
	           ApiResponse response = eventService.addEvent(eventDto, email);
				return ResponseEntity.status(HttpStatus.CREATED).body(response);
			}
			catch(RuntimeException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
			}
			
   	}
}
