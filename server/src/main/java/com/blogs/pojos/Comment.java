package com.blogs.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "comments")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true,of= {"commentText","rating"})
public class Comment extends BaseEntity {
	@Column(name = "comment_text", length = 100)
	private String commentText;
	private int rating;
	//many ---> one (Comment *-->1 User:commenter)
	@ManyToOne
	@JoinColumn(nullable = false)
	private User commenter;
	//many ---> one (Comment *-->1 BlogPost)
	@ManyToOne
	@JoinColumn(nullable = false)
	private BlogPost post;
	public Comment(String commentText, int rating) {
		super();
		this.commentText = commentText;
		this.rating = rating;
	}
	

}
