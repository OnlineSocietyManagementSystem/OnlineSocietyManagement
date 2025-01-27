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

	private String building;
	
	private int flatNo;
	
	private int floor;
	
	UserRole role;

	private int addhar;

	private int phone;

	private int familyCount;
}
