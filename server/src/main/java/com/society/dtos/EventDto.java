package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

//import com.society.pojos.User;

//import jakarta.validation.constraints.Past;
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
public class EventDto extends BaseDto{

	
	private String title;
	
	private String description;
	
	
	private LocalDate date;

	private Long userId;

	private String location;
	
	private LocalTime time;
}
