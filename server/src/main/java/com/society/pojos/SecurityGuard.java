package com.society.pojos;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guards")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SecurityGuard extends BaseEntity {

	@Column(length=50)
    private String name;
    
    @Column(name="contact_no")
    private String contactNumber;
    
    @ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}

