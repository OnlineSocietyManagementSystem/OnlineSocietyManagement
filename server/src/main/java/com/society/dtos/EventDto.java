package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalTime;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EventDto {

	
	private String title;
	
	private String description;
	

	private LocalDate date;


	private String location;
	
	private LocalTime time;
}
