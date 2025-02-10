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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.FeedbackDto;
import com.society.service.FeedbackService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class FeedbackController {

	@Autowired
	private FeedbackService feedbackService;

	@PostMapping("/add-feedback")
	public ResponseEntity<?> addFeedback(@Valid @RequestBody FeedbackDto dto, Authentication authentication) {
			String email = authentication.getName();
			System.out.println("Extracted User Email: " + email);

			// Call service layer
			ApiResponse response = feedbackService.addFeedback(dto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	@GetMapping("/all-feedbacks")
    public ResponseEntity<List<FeedbackDto>> getAllFeedbacks() {
            List<FeedbackDto> feedbacks = feedbackService.getAllFeedbacks();
            return ResponseEntity.ok(feedbacks);
    }

    @DeleteMapping("/delete-feedback/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
}
}
