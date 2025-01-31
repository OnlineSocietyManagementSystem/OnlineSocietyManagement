package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.dtos.EventResponseDto;
import com.society.service.EventService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class EventController {

	@Autowired
	private EventService eventService;
	
	@PostMapping("/add-event")
	public ResponseEntity<?> addEvent(@RequestBody @Valid EventDto eventDto, Authentication authentication) {
		try {

			String email = authentication.getName();
			// Extract logged-in user's email
//	            System.out.println(eventDto);
			ApiResponse response = eventService.addEvent(eventDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}

	}

	@GetMapping("/all-events")
	public ResponseEntity<?> getAllEvents() {
		try {
			List<EventResponseDto> events = eventService.getAllEvents();
			if (events.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(events);
			}

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

	@DeleteMapping("/delete-event/{eventId}")
	public ResponseEntity<?> deleteEvent(@PathVariable Long eventId, Authentication authentication) {
		try {
			String email = authentication.getName();
			ApiResponse response = eventService.deleteEvent(eventId, email);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

}
