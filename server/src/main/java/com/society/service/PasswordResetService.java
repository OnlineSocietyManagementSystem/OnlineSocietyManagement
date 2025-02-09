package com.society.service;

public interface PasswordResetService {

	String generateResetToken(String email);

	boolean resetPassword(String token, String newPassword);

}
