package com.society.pojos;



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
@Table(name="feedback")
public class Feedback extends BaseEntity{

	private String content;

	public Feedback(String content) {
		super();
		this.content = content;
	}
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
}
