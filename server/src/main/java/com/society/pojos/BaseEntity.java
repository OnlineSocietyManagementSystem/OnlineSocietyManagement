package com.society.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.*;

import jakarta.persistence.*;
import lombok.*;

@MappedSuperclass // class level annotation to specify following is a base class from which other
//entities will inherit , no separate table !
@Getter
@Setter
@ToString
public class BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@CreationTimestamp
	@Column(name="created_on")
	private LocalDate createdOn;
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDateTime updatedOn;
	
	
	
	
}