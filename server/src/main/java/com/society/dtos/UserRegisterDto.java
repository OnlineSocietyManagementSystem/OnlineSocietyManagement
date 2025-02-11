package com.society.dtos;

import com.society.pojos.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegisterDto {

	@NotBlank(message = "Name cannot be empty")
	@Size(min = 3, message = "Name must have at least 3 characters")
	private String firstName;

	@NotBlank(message = "Name cannot be empty")
	@Size(min = 3, message = "Name must have at least 3 characters")
	private String lastName;

	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank(message = "Password cannot be empty")
	@Size(min = 6, message = "Password must be at least 6 characters long")
	private String password;

	private String phone;

}
