package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventResponseDto extends BaseDto {

	private String title;

	private String description;

	private LocalDate date;

	private String location;

	private LocalTime time;
}
