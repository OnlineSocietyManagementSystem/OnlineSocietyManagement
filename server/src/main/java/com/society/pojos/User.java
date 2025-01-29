package com.society.pojos;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="users")
public class User extends BaseEntity {
   
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	@Column(unique=true ,length=25,nullable=false)
	private String email;
	
	@Column(length=500,nullable=false)
	private String password;
	
	@Column(length=25)
	private String building;
	
	private int flatNo;
	
	private int floor;
	
	@Enumerated(EnumType.STRING) 
	@Column(length = 30)
	UserRole role;
	
	@Column(unique=true ,length=20)
	private String  addhar;
	
	@Column(unique=true ,length=10)
	private String phone;
	
	@Column(name="family_count")
	private int familyCount;

	public User(String building, int flatNo, int floor, String addhar, String phone) {
		super();
		this.building = building;
		this.flatNo = flatNo;
		this.floor = floor;
		this.addhar = addhar;
		this.phone = phone;
	}
}