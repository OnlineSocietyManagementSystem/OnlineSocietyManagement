package com.society.dtos;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDto extends BaseDto{
		
	
		private String title;
		
		private String description;
		
		private LocalDate date_issued;
		
		
}
