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
@Table(name="notices")
public class Notices extends BaseEntity {
	
	@Column(length=50)
	private String title;
	
	@Column(length=100)
	private String description;
	
	private LocalDate date_issued;
	
	
	
	public Notices(String title, String description, LocalDate date_issued, Admin admin) {
		super();
		this.title = title;
		this.description = description;
		this.date_issued = date_issued;
		this.admin = admin;
	}



	@ManyToOne
	@JoinColumn(name = "admin_id",nullable = false)
	private Admin admin;
	
	

}
