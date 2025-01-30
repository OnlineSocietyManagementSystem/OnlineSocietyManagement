package com.society.pojos;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="society")

public class Society extends BaseEntity{
	
	
		@Column(length=25)
		private String name;
		
		@Column(length=50)
		private String address;
					
		
		@ManyToOne
		@JoinColumn(name = "user_id")
		private User user;
}
