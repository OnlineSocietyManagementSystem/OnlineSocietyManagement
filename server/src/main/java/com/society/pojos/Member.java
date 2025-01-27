package com.society.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="members")
public class Member extends BaseEntity {
   
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	@Column(unique=true ,length=25,nullable=false)
	private String email;
	
	@Column(unique=true ,length=10,nullable=false)
	private String password;
	
	@Column(length=25)
	private String building;
	
	private int flatNo;
	
	private int floor;
	
	
	
	@Enumerated(EnumType.STRING) // create column of type
	// varchar to store the name of constant
	@Column(length = 30)
	UserRole role;
	
	@Column(unique=true ,length=20,nullable=false)
	private int addhar;
	
	@Column(unique=true ,length=10,nullable=false)
	private int phone;
	
	@Column(name="family_count")
	private int familyCount;

	public Member(String building, int flatNo, int floor, int addhar, int phone) {
		super();
		this.building = building;
		this.flatNo = flatNo;
		this.floor = floor;
		this.addhar = addhar;
		this.phone = phone;
	}
	
	
	
}
