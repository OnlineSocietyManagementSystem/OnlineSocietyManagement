package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.AuthRequest;
import com.society.dtos.AuthResp;
import com.society.dtos.MemberRegisterDto;
import com.society.security.JwtUtils;
import com.society.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173/")
public class AuthController {

	@Autowired
	private AuthService memberService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody MemberRegisterDto dto) {
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(memberService.registerMemeber(dto));
		} catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
	

	@PostMapping("/signin")
	@Operation(description = "User sign in")
	public ResponseEntity<?> userSignIn(@RequestBody @Valid
			AuthRequest dto) {
		System.out.println("in sign in "+dto);
		//1. Create auth token using suser supplied em n pwd
		UsernamePasswordAuthenticationToken 
		authenticationToken = new UsernamePasswordAuthenticationToken
		(dto.getEmail(),dto.getPassword());
		System.out.println(authenticationToken.isAuthenticated());//f
		//2. invoke Spring sec supplied auth mgr's authenticate method
		Authentication authToken = 
				authenticationManager.authenticate(authenticationToken);
		//=> auth success
		System.out.println(authToken.isAuthenticated());//t
		//3 . Send auth respone to the client containing JWTS
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new AuthResp("Successful Auth !",
						jwtUtils.generateJwtToken(authToken)));		
		
	}
	
}
