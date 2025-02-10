package com.society.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedbackDto extends BaseDto {

	private String content;
	
	private String firstName;
	
	private String lastName;

}
