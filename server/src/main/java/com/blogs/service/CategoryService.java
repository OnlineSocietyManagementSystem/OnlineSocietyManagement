package com.blogs.service;

import java.util.List;

import com.blogs.dtos.ApiResponse;
import com.blogs.dtos.CategoryRespDTO;
import com.blogs.dtos.CategoryRequestDTO;
import com.blogs.pojos.Category;

public interface CategoryService {

	List<CategoryRespDTO> getAllCategories();

	ApiResponse addNewCategory(CategoryRequestDTO dto);

	ApiResponse deleteCategory(Long categoryId);

	CategoryRespDTO getCategoryById(Long catId);

	ApiResponse updateCategoryDetails(CategoryRequestDTO dto, Long categoryId);

}
