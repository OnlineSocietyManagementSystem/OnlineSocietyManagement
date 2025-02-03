package com.society.pojos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@AllArgsConstructor
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

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}
