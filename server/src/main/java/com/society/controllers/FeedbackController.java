package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.FeedbackDto;
import com.society.service.FeedbackService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;

	@PostMapping("/add-feedback")
	public ResponseEntity<?> addFeedback(@RequestBody FeedbackDto dto, Authentication authentication) {
		try {
			String email = authentication.getName();
			System.out.println("Extracted User Email: " + email);

			// Call service layer
			ApiResponse response = feedbackService.addFeedback(dto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

}
