package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.NoticeDto;
import com.society.service.NoticeService;

import jakarta.validation.Valid;

@RestController
public class NoticeController {
	
	
	@Autowired
	private NoticeService noticeService;
	
	// admin should be able to add the events
		@PostMapping("/add-notice")
		public  ResponseEntity<?> addEvent(@RequestBody @Valid NoticeDto eventDto) {
			try {
				return ResponseEntity.status(HttpStatus.CREATED)
						.body(noticeService.addNotice(eventDto));
			}
			catch(RuntimeException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new com.society.dtos.ApiResponse(e.getMessage()));
			}
			
   	}

}
