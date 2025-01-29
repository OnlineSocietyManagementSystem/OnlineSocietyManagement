package com.society.pojos;


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
@Table(name="resources")
public class Resources extends BaseEntity{

	
	@Column(length=25)
	private String resource_type;
	
	@Column(length=50)
	private String description;



	@ManyToOne
	@JoinColumn(name = "society_id",nullable = false)
	private Society society;
	
	

}
