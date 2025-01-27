package com.blogs.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class CategoryRespDTO extends BaseDTO {
	private String categoryName;
	private String description;

	public CategoryRespDTO(String categoryName, String description) {
		super();
		this.categoryName = categoryName;
		this.description = description;
	}

}
