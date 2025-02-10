package com.society.dtos;


import com.society.pojos.UserRole;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRegisterDto {

	private String firstName;

	private String lastName;
	
	private String email;
	
	@Size(min = 8, message = "Password must be at least 8 characters")
	private String password;
	UserRole role;
	
	

	
}
