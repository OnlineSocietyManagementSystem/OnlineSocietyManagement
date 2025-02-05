package com.society.dtos;


import lombok.AllArgsConstructor;

import com.society.pojos.UserRole;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto extends BaseDto {
	
	private String firstName;
	
	private String lastName;
	
	private String email;


	private String building;
	
	private int flatNo;
	
	private int floor;
	
	UserRole role;
	
	private String  aadhar;

	private String phone;

	private int familyCount;
	private Long societyId;

	


}
