package com.society.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.society.dtos.ApiResponse;
import com.society.dtos.ForgetPasswordDto;
import com.society.dtos.ResetPasswordDto;
import com.society.service.PasswordResetService;

@RestController
public class PasswordResetController {

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/forgot-password")
	public ResponseEntity<String> requestReset(@RequestBody ForgetPasswordDto dto) {
		passwordResetService.generateResetToken(dto.getEmail());
		return ResponseEntity.ok("Password reset link has been sent to your email.");
	}
	
	@PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@RequestParam String token, @RequestBody ResetPasswordDto dto) {
        boolean success = passwordResetService.resetPassword(token, dto.getNewPassword());
        if (success) {
            return ResponseEntity.ok(new ApiResponse("Password has been reset successfully"));
        }
        return ResponseEntity.badRequest().body(new ApiResponse("Invalid or expired token."));
    }

}
