package com.society.pojos;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class Feedback extends BaseEntity{

	private String content;

	public Feedback(String content) {
		super();
		this.content = content;
	}
	
	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private Member member;
	
}
