package com.blogs.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blogs.custom_exception.ResourceNotFoundException;
import com.blogs.dao.CategoryDao;
import com.blogs.dtos.ApiResponse;
import com.blogs.dtos.CategoryRespDTO;
import com.blogs.dtos.CategoryRequestDTO;
import com.blogs.pojos.Category;

@Service // Spring bean containing B.L
@Transactional
public class CategoryServiceImpl implements CategoryService {
	// depcy - dao layer i/f
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<CategoryRespDTO> getAllCategories() {
		// map List<Category> --> List<CategoryRespDTO>
		return categoryDao.findAll() //List<Category>
				.stream() //Stream<Catgeory>
				.map(category -> 
				modelMapper.map(category, 
						CategoryRespDTO.class))//Stream<resp dto>
				.collect(Collectors.toList());//List<dtos>
	}

	@Override
	public ApiResponse addNewCategory(CategoryRequestDTO dto) {
		//dto -> entity
		Category transientCategory = 
				modelMapper.map(dto, Category.class);
		Category persistentCategory = categoryDao
				.save(transientCategory);
		return new ApiResponse("Added new catgroy with ID " 
				+ persistentCategory.getId());
	}

	@Override
	public ApiResponse deleteCategory(Long categoryId) {
		String mesg = "Invalid Category ID !!!!!";
		if (categoryDao.existsById(categoryId)) {
			categoryDao.deleteById(categoryId);
			mesg = "Deleted category details";
		}
		return new ApiResponse(mesg);
	}

	@Override
	public CategoryRespDTO getCategoryById(Long catId) {

		Category categoryEnt = categoryDao.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Category ID!!!"));
		//categoryEnt : persistent
		// entity -> dto
		return modelMapper.map(categoryEnt, CategoryRespDTO.class);
	}

	@Override
	public ApiResponse updateCategoryDetails(CategoryRequestDTO dto, Long categoryId) {
		String mesg = "Category Updation Failed - invalid category ID";
		// validate
		Category categoryEnt = categoryDao.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Category ID!!!"));
		// dto --> entity
		modelMapper.map(dto, categoryEnt);
		categoryDao.save(categoryEnt);
		mesg = "category updated !";
		return new ApiResponse(mesg);
	}

}
