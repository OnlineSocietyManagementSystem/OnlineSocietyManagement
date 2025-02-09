package com.society.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
@Table(name="events")
public class Events extends BaseEntity{

	@Column(length=50)
	private String title;
	
	@Column(length=100)
	private String description;
	
	private LocalDate date;
	
	@Enumerated(EnumType.STRING)
	private ActivityStatus status;

	@Column(length=25)
	private String location;
	
	private LocalTime time;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	public Events(String title, String description, LocalDate date, ActivityStatus status, String location,
			LocalTime time, User user) {
		super();
		this.title = title;
		this.description = description;
		this.date = date;
		this.status = ActivityStatus.ACTIVE;
		this.location = location;
		this.time = time;
		this.user = user;
	}
	
	
	
	
}
