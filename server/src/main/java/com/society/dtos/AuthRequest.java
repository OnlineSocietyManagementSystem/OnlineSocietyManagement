package com.society.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
	
	@NotBlank(message = "Email must be not null n not blank!!!!")
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank
	private String password;
}
