package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.society.pojos.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SocietyDto {
	
	private String title;
	
	private String description;
	
	private LocalDate date;

	private String location;
	
	private LocalTime time; 
	
	private User userId;

}
