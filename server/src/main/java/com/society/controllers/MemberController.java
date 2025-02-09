package com.society.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;

import com.society.dtos.MemberRespDto;
import com.society.service.MemberService;

@RestController

public class MemberController {
	
	@Autowired
	private MemberService memberService;

	@GetMapping("/all-members")
	
	public ResponseEntity<?> getAllEvents() {
		try {
			List<MemberRespDto> members = memberService.getAllMembers();
			if (members.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
			} else {
				return ResponseEntity.ok(members);
			}

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
