package com.society.dtos;

import com.society.pojos.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRegisterDto {

	private String firstName;

	private String lastName;
	
	private String email;
	
	private String password;
	UserRole role;

	
}
