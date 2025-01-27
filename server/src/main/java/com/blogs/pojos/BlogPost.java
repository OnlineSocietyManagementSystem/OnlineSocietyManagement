package com.blogs.pojos;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "posts")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true,exclude = {"blogCategory","blogger"})
@EqualsAndHashCode(of="title",callSuper = false)
public class BlogPost extends BaseEntity {
	@Column(unique = true, length = 100)
	private String title;
	private String description;
	@Column(length = 1000)
	private String content;
	//add status flag : for soft delete operation
	private boolean status;
	//BlogPost * -----> 1 Category
	//BlogPost - many , child , owning side
	//(=the side containing physical mapping of the association : FK)
	@ManyToOne //mandatory , o.w MappingException
	@JoinColumn(name = "category_id",nullable = false)//to customize name of FK column 
	//+ added NOT NULL constraint
	private Category blogCategory;
	//BlogPost * ---> 1 User(Blogger)
	@ManyToOne(fetch = FetchType.LAZY)//mandatory , o.w MappingException
	//w/o adding @JoinColumn - blogger_id
	@JoinColumn(nullable = false)
	private User blogger;
	public BlogPost(String title, String description, String content) {
		super();
		this.title = title;
		this.description = description;
		this.content = content;
	}	
}
