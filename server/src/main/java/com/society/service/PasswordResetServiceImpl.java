package com.society.service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.PasswordResetTokenDao;
import com.society.daos.UserDao;
import com.society.pojos.PasswordResetToken;
import com.society.pojos.User;

@Service
@Transactional
public class PasswordResetServiceImpl implements PasswordResetService {

	@Autowired
	private UserDao userDao;

	@Autowired
	private PasswordResetTokenDao tokenDao;

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private static final int TOKEN_EXPIRY_MINUTES = 30;

	@Override
	public String generateResetToken(String email) {
		User user = userDao.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		// Delete any existing token for this user to maintain uniqueness
		tokenDao.deleteByUser(user);

		// Generate a new token
		String token = UUID.randomUUID().toString();
		PasswordResetToken resetToken = new PasswordResetToken();
		resetToken.setToken(token);
		resetToken.setUser(user);
		resetToken.setExpiryDate(LocalDateTime.now().plusMinutes(TOKEN_EXPIRY_MINUTES));

		tokenDao.save(resetToken);

		// Send reset email
		sendResetEmail(user.getEmail(), token);

		return token;
	}

	private void sendResetEmail(String email, String token) {
		String resetLink = "https://online-society-management-fe.vercel.app/reset-password/" + token;

		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(email);
		message.setSubject("Password Reset Request");
		message.setText("Click the link to reset your password: " + resetLink);

		mailSender.send(message);
	}

	@Override
	public boolean resetPassword(String token, String newPassword) {
		PasswordResetToken resetToken = tokenDao.findByToken(token)
				.orElseThrow(() -> new RuntimeException("Invalid or expired token"));

		// Check if the token is expired
		if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
			tokenDao.delete(resetToken); // Delete expired token
			throw new RuntimeException("Token has expired");
		}

		// Update user password
		User user = resetToken.getUser();
		user.setPassword(passwordEncoder.encode(newPassword));
		userDao.save(user);

		// Remove token after successful password reset
		tokenDao.delete(resetToken);

		return true;
	}
}
