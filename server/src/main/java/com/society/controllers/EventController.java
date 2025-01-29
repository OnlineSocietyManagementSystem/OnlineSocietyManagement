package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.EventDto;
import com.society.service.EventService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;


@RestController
public class EventController {
	
	@Autowired
	private EventService eventService;
	
	// admin should be able to add the events
		@PostMapping("/add-event")
		public  ResponseEntity<?> addEvent(@RequestBody EventDto eventDto) {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(eventService.addEvent(eventDto));
		}

}
