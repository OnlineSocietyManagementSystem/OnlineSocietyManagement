package com.society.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="bookings")
public class Bookings extends BaseEntity {
	

	private boolean status;
	
	@Column(nullable=false)
	private LocalDate bookingDate;
	
	@Column(length=25)
	private String resourceType;
	
	@Column(length=50)
	private String purpose;
	
	
	
	public Bookings(boolean status, LocalDate bookingDate, String resourceType, String purpose, User member) {
		super();
		this.status = status;
		this.bookingDate = bookingDate;
		this.resourceType = resourceType;
		this.purpose = purpose;
		this.member = member;
	}



	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private User member;
	

}
