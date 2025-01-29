package com.society.pojos;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class Admin extends BaseEntity {

	@Enumerated(EnumType.STRING) 
	@Column(length = 30)
	UserRole role;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	@Column(unique=true ,length=25,nullable=false)
	private String email;
	
	@Column(unique=true ,length=10,nullable=false)
	private String password;
	
	public Admin(UserRole role, String firstName, String lastName, String email, String password) {
		super();
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
	}
	
	
}
