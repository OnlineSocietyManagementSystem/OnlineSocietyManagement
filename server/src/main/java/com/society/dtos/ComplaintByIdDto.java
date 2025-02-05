package com.society.dtos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.society.pojos.ComplaintStatus;
import com.society.pojos.Complaints;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintByIdDto {
	private Long id;
	private LocalDate createdOn;
	private LocalDateTime updatedOn;
	private String title;
	private String description;
	private ComplaintStatus status;
	private LocalDateTime creationDate;

	public ComplaintByIdDto(Complaints complaint) {
	    this.id = complaint.getId();  // Set ID
	    this.createdOn = complaint.getCreatedOn();  // Set createdOn
	    this.updatedOn = complaint.getUpdatedOn();  // Set updatedOn
	    this.title = complaint.getTitle();
	    this.description = complaint.getDescription();
	    this.status = complaint.getStatus();
	    this.creationDate = complaint.getUpdatedOn();    
	}
}
