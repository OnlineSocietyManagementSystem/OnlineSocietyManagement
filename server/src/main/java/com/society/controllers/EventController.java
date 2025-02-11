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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.dtos.EventResponseDto;
import com.society.service.EventService;

import jakarta.validation.Valid;


@RestController
public class EventController {

	@Autowired
	private EventService eventService;
	
	@PostMapping("/add-event")
	public ResponseEntity<?> addEvent(@RequestBody @Valid EventDto eventDto, Authentication authentication) {
			String email = authentication.getName();
			// Extract logged-in user's email
//	            System.out.println(eventDto);
			ApiResponse response = eventService.addEvent(eventDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);

	}

	@GetMapping("/all-events")
	public ResponseEntity<?> getAllEvents() 
	{
		 List<EventResponseDto> events = eventService.getAllEvents();
			if (events.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(events);
			}
	}

	@PutMapping("/delete-event/{eventId}")
	public ResponseEntity<?> deleteEvent(@PathVariable Long eventId, Authentication authentication) {
			String email = authentication.getName();
			ApiResponse response = eventService.deleteEvent(eventId, email);
			return ResponseEntity.ok(response);
	}
	
	

}
