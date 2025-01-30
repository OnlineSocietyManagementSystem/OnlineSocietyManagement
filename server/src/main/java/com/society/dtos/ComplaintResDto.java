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
public class ComplaintResDto {
	private Long id;
    private String title;
    private String description;
    private ComplaintStatus status;
    private Long userId; // Make sure this is included
    private LocalDate creationDate;
    
    public ComplaintResDto(Complaints complaint) {
        this.id = complaint.getId();
        this.title = complaint.getTitle();
        this.description = complaint.getDescription();
        this.status = complaint.getStatus();
        this.userId = complaint.getUser() != null ? complaint.getUser().getId() : null; // Extract user ID
        this.creationDate = complaint.getCreatedOn();
    }

}
