package com.society.dtos;

import com.society.pojos.ComplaintStatus;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString

public class ComplaintDto extends BaseDto{
  
	private String title;
	
	private String description;
	
	private ComplaintStatus status;
    
	private Long userId;

	public ComplaintDto(String title, String description, ComplaintStatus status, Long userId) {
		super();
		this.title = title;
		this.description = description;
		this.status = status;
		this.userId = userId;
	}
	

}
