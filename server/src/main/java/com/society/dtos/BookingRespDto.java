package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import com.society.pojos.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingRespDto extends BaseDto {

	    private BookingStatus status;
	    
	    private LocalDate bookingDate;
	    
	    private LocalTime startTime;
	    
	    private LocalTime endTime;
	    
	    private String purpose;
	    
	    private String comments;
	    
	    private String resourceName;  
	    
	    private String userEmail;
}
