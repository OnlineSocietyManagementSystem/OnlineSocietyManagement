package com.society.pojos;

import jakarta.persistence.Entity;

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
	
	

}
