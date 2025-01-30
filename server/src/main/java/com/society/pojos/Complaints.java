package com.society.pojos;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="complaints")
public class Complaints extends BaseEntity{
	
	
	@Column(length=40)
	private String title;
	
	@Column(length=50)
	private String description;
	
	@Enumerated(EnumType.STRING)  
	private ComplaintStatus status;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	
	
	
}
