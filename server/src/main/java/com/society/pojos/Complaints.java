package com.society.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="complaints")
public class Complaints extends BaseEntity{
	
	
	@Column(length=40)
	private String title;
	
	@Column(length=50)
	private String description;
	
	private boolean status;

	
	
	public Complaints(String title, String description, boolean status, User member) {
		super();
		this.title = title;
		this.description = description;
		this.status = status;
		this.member = member;
	}



	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private User member;
	
	
	
	
}
