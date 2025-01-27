package com.blogs.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * users table 
column - id(PK) , first name , last name, email ,password
 , dob , registration amount,role,image
 */
@Entity // mandatory class level annotation for hibernate , to specify
//following class represents DB entity
@Table(name = "users") // to specify name of the table
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = { "password", "image" })

public class User extends BaseEntity {

	@Column(name = "first_name", length = 20) // column name , varchar(20)
	private String firstName;
	@Column(name = "last_name", length = 20) // column name , varchar(20)
	private String lastName;
	@Column(length = 25, unique = true) // adds unique constraint
	private String email;
	@Column(length = 20, nullable = false) // not null constraint
	private String password;
	private LocalDate dob;
	@Column(name = "reg_amount")
	private double regAmount;
	@Enumerated(EnumType.STRING) // create column of type
	// varchar to store the name of constant
	@Column(length = 30) // varchar(30)
	private UserRole role;
	@Lob // => large object , Mysql - uses longblob
	private byte[] image;
	//User 1--->1 Address , User - one , owning side (will contain FK)
	@OneToOne
	@JoinColumn(name="address_id")
	private Address userAddress;
	//User 1--->1 AdhaarCard , mapping between 
	//entity n value type(component)
	//represents composition
	@Embedded //optional , added only for clarity !
	private AdhaarCard card;
	//Can a blogger write a blog in single language or multiple ? multiple
	//example of collection of components , User 1---->* languages
	@ElementCollection//mandatory annotation , to be applied 
	@CollectionTable(name = "user_langs",
	joinColumns = @JoinColumn(name="user_id")) 
	//optional annotation to specify name of the collection table n FK column name
	//for collection of either basic or composite value types
	@Column(name="language_name",length = 20)
	private List<String> languages=new ArrayList<>();
	public User(String firstName, String lastName, String email, String password, LocalDate dob, double regAmount,
			UserRole role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.regAmount = regAmount;
		this.role = role;
	}
}
