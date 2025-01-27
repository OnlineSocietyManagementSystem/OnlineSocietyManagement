package com.society.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="members")
public class Member extends User {

	@Column(length=25)
	private String building;
	
	private int flatNo;
	
	private int floor;
	
	@Column(unique=true ,length=20,nullable=false)
	private int addhar;
	
	@Column(unique=true ,length=10,nullable=false)
	private int phone;

	public Member(String building, int flatNo, int floor, int addhar, int phone) {
		super();
		this.building = building;
		this.flatNo = flatNo;
		this.floor = floor;
		this.addhar = addhar;
		this.phone = phone;
	}
	
	
	
}
