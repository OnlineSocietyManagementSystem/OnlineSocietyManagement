package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.MemberLoginDto;
import com.society.dtos.MemberRegisterDto;
import com.society.service.MemberService;

@RestController
@RequestMapping("/user")
public class MemberController {

	@Autowired
	private MemberService memberService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody MemberRegisterDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(memberService.registerMemeber(dto));
		} catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	
//	@PostMapping
//	public ResponseEntity<?> loginUser(@RequestBody UserLoginDto dto) {
//		
//	}
}
