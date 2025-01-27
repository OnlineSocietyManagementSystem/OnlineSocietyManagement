package com.society.pojos;


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
@Table(name="resources")
public class Resources extends BaseEntity{

	
	@Column(length=25)
	private String resource_type;
	
	@Column(length=50)
	private String description;

	
	public Resources(String resource_type, String description, Society society) {
		super();
		this.resource_type = resource_type;
		this.description = description;
		this.society = society;
	}


	@ManyToOne
	@JoinColumn(name = "society_id",nullable = false)
	private Society society;
	
	

}
