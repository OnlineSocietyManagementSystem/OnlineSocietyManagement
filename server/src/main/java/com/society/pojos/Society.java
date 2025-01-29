package com.society.pojos;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="society")

public class Society extends BaseEntity{
	
	
		@Column(length=25)
		private String name;
		
		@Column(length=50)
		private String address;
			
		public Society(String name, String address, Admin admin) {
			super();
			this.name = name;
			this.address = address;
			this.admin = admin;
		}

		@ManyToOne
		@JoinColumn(name = "admin_id",nullable = false)
		private Admin admin;
}
