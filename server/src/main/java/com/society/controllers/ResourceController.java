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
import com.society.dtos.ResourceRequestDto;
import com.society.dtos.ResourceResponseDto;
import com.society.service.ResourceService;

@RestController
public class ResourceController {

	@Autowired
	private ResourceService resourceService;
	
	@PostMapping("/add-resource")
	public ResponseEntity<?> addResource(@RequestBody ResourceRequestDto dto, Authentication authentication) {
		try {
			String email = authentication.getName();
			System.out.println("Extracted User Email : " + email);
			
			ApiResponse response = resourceService.addResource(dto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
			
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/all-resources")
	public ResponseEntity<?> getAllResources() {
		try {
			List<ResourceResponseDto> resources = resourceService.getAllResources();
			
			if(resources.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(resources);
			}
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete-resource/{resourceId}")
	public ResponseEntity<?> deleteResource(@PathVariable Long resourceId, Authentication authentication) {
		try {
			String email = authentication.getName();
			ApiResponse response = resourceService.deleteResource(resourceId, email);
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
