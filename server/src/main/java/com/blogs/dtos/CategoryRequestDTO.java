package com.blogs.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class CategoryRequestDTO  {
	private String categoryName;
	private String description;

	public CategoryRequestDTO(String categoryName, String description) {
		super();
		this.categoryName = categoryName;
		this.description = description;
	}

}
