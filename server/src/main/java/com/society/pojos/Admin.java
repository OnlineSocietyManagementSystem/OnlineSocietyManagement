package com.society.pojos;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Getter;
//import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
//@NoArgsConstructor
//@AllArgsConstructor
public class Admin extends User {

	public Admin() {
		super();
	}
	@OneToMany
	@JoinColumn(name="notice_id",nullable=false)
	private List<Notices> noticeList = new ArrayList<>();
	
	@OneToMany
	@JoinColumn(name="event_id",nullable=false)
	private List<Events> eventList = new ArrayList<>();

	
	@OneToMany
	@JoinColumn(name="member_id",nullable=false)
	private List<Members> memberList = new ArrayList<>();
	
	@OneToMany
	@JoinColumn(name="guard_id",nullable=false)
	private List<Guards> guardList = new ArrayList<>();
	
}
