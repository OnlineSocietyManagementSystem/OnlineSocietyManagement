package com.society.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Complaints extends BaseEntity{
	
	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private Member member;
	
	@Column(length=40)
	private String title;
	private String description;
	private boolean status;
	
	
	
}
