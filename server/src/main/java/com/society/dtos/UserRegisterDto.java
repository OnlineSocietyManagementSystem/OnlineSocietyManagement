package com.society.dtos;


import com.society.pojos.UserRole;


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
	
	private String password;
	UserRole role;
	
	

	
}
