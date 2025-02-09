package com.society.pojos;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends BaseEntity {

	 @NotBlank(message = "Name cannot be empty")
	@Size(min = 3, message = "Name must have at least 3 characters")
	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;
	
	
	 @NotBlank(message = "Email cannot be empty")
	 @Email(message = "Invalid email format")
	@Column(unique = true, length = 50, nullable = false)
	private String email;

	 
	 @NotBlank(message = "Password cannot be empty")
	 @Size(min = 6, message = "Password must be at least 6 characters long")
	@Column(length = 500, nullable = false)
	private String password;

	@Column(length = 25)
	private String building;

	private int flatNo;

	private int floor;

	@Enumerated(EnumType.STRING)
	@Column(length = 30)
	UserRole role;

	@Column(unique = true, length = 20)
	private String aadhar;

	@Column(unique = true, length = 13)
	private String phone;

	@Column(name = "family_count")
	private int familyCount;

	// @ManyToOne
	// @JoinColumn(name="society_id")
	// private Society society;

}