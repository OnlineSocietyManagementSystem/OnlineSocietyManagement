package com.society.dtos;

import java.time.LocalDateTime;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class GuestDto {
	
	 private String name;
	 
	    private String contactNumber;
	    
	    private LocalDateTime entryTime;


}
