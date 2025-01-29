package com.society.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="events")
public class Events extends BaseEntity{

	@Column(length=50)
	private String title;
	
	@Column(length=100)
	private String description;
	
	private LocalDate date;

	@Column(length=25)
	private String location;
	
	private LocalTime time;

	public Events(String title, String description, LocalDate date, String location, LocalTime time) {
		super();
		this.title = title;
		this.description = description;
		this.date = date;
		this.location = location;
		this.time = time;
	}
	
	@ManyToOne
	@JoinColumn(name = "admin_id",nullable = false)
	private Admin admin;
	
	
}
