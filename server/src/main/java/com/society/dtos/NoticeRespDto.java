package com.society.dtos;

import java.time.LocalDate;

import com.society.pojos.Notices;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeRespDto {
	
		private String title;
		
		private String description;
		
		private LocalDate date_issued;
		
		  private Long userId;
		  
		  
		  public NoticeRespDto(Notices notice) {
		        this.title = notice.getTitle();
		        this.description = notice.getDescription();
		        this.date_issued = notice.getDate_issued();
		        this.userId = (notice.getUser() != null) ? notice.getUser().getId() : null; // Assuming Notices has a User entity
		    }
		
	}


