package com.society.dtos;

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
public class SocietyResponseDto {
	
		private String name;
		
		private String address;
		
		private String contact_no;
		
		private int buildingCount;
		
		private int floorCount;
		
		private int flatCount;
		
}
