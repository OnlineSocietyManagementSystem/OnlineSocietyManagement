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
import com.society.dtos.EventResponseDto;
//import com.society.dtos.ComplaintResDto;
import com.society.dtos.NoticeDto;
import com.society.dtos.NoticeRespDto;
//import com.society.dtos.NoticeRespDto;
import com.society.pojos.Notices;
import com.society.service.NoticeService;

import jakarta.validation.Valid;

@RestController
public class NoticeController {

	@Autowired
	private NoticeService noticeService;

	// admin should be able to add the notices
	@PostMapping("/add-notice")
	public ResponseEntity<?> addNotice(@RequestBody @Valid NoticeDto eventDto, Authentication authentication) {
		try {
			String email = authentication.getName();
			ApiResponse response = noticeService.addNotice(eventDto, email);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new com.society.dtos.ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/all-notices")
	public ResponseEntity<?> getAllNotices() {
		try {
			List<NoticeRespDto> notices = noticeService.getAllNotices();

			if (notices.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {

				return ResponseEntity.ok(notices);
			}

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}

	}

	@DeleteMapping("/delete-notice/{id}")
	public ResponseEntity<?> deleteNotice(@PathVariable Long id, Authentication authentication) {
		try {
			String email = authentication.getName();
			ApiResponse response = noticeService.deleteNotice(id, email);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}

}
