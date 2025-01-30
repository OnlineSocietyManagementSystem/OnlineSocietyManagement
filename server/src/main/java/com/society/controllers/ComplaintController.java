package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.jwt.Jwt;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.ComplaintDto;
import com.society.service.ComplaintService;
import com.society.service.ComplaintServiceImpl;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/addComplaint")
    public ResponseEntity<?> addComplaint(@RequestBody ComplaintDto dto, Authentication authentication) {
        try {
        	    String email = authentication.getName();
                System.out.println("Extracted User Email: " + email);

                // Call service layer
                ApiResponse response = complaintService.addComplaint(dto, email);
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } 
         catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
        }
    }
}


		 
 
	
	


