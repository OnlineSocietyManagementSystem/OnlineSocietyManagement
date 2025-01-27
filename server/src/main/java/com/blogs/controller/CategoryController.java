package com.blogs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogs.dtos.ApiResponse;
import com.blogs.dtos.CategoryRequestDTO;
import com.blogs.dtos.CategoryRespDTO;
import com.blogs.pojos.Category;
import com.blogs.service.CategoryService;

@RestController 
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
	// depcy
	@Autowired
	private CategoryService categoryService;

	public CategoryController() {
		System.out.println("in ctor " + getClass());
	}

	/*
	 * Desc - get all catgeories 
	 * URL - http://host:port/categories 
	 * Method - GET
	 * Payload - none 
	 * success Resp -SC 200 ,+ JSON representation of List<Categoryresp dtos>
	 * failure(empty list) resp - SC 204
	 */
	@GetMapping
	public ResponseEntity<?> getAllCategories() {
		System.out.println("in get all categories");
		List<CategoryRespDTO> categories = 
				categoryService.getAllCategories();
		if (categories.isEmpty()) {
			// SC 204
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} else {
			// SC 200 + list
			return ResponseEntity.ok(categories);
		}
	}

	/*
	 * Desc - Add new Category URL - http://host:port/categories Method - POST
	 * Payload - JSON representation of Category 
	 * success Resp -SC 201 + Api resp
	 * -DTO (time stamp , mesg) 
	 * failure resp - SC 500 | SC 400 + Api resp -DTO (time
	 * stamp ,err mesg)
	 */
	// @RequestBody - de serial (un marshalling) JSON -> Java
	@PostMapping
	public ResponseEntity<?> addNewCategory
	(@RequestBody CategoryRequestDTO 
			dto) {
		System.out.println("in add new category " + dto);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(categoryService
							.addNewCategory(dto));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}

	/*
	 * Desc - Delete category by id URL - http://host:port/categories/{categoryId}
	 * Method - DELETE Payload - path variable(=URI template var) - categoryId Resp
	 * - string mesg (success | failure)
	 */
	// existsById , deleteByid
	@DeleteMapping("/{categoryId}")
	/*
	 * @PathVariable - method arg level annotation To bind URI (path) variable to
	 * method arg
	 */
	public ResponseEntity<?> deleteCategory(@PathVariable Long categoryId) {
		System.out.println("in delete category " + categoryId);
		return ResponseEntity.ok(
				categoryService.deleteCategory(categoryId));
	}

	/*
	 * Desc - Get category by id 
	 * URL - http://host:port/categories/{categoryId}
	 * Method - GET 
	 * Payload - path variable(=URI template var) - categoryId 
	 * Successful Resp - SC 200 n category details(JSON representation of Category)
	 * Failure resp - SC 404 , Apiresp - err mesg
	 * 
	 */
	@GetMapping("/{catId}")
	public ResponseEntity<?> getCategoryDetails(
			@PathVariable Long catId) {
		System.out.println("in get category " + catId);
		try {
		return ResponseEntity.ok
				(categoryService.getCategoryById(catId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new ApiResponse(e.getMessage()));
		}
	}

	/*
	 * Desc - Update Category details URL - http://host:port/categories Method - PUT
	 * Payload - request body - JSON representation of updated category details Resp
	 * - a mesg
	 */
	@PutMapping("/{categoryId}")
	public ResponseEntity<?> updateCategoryDetails(@RequestBody 
			CategoryRequestDTO dto ,@PathVariable Long categoryId) {
		System.out.println("in update " + dto +" "+categoryId);
		return ResponseEntity.ok(
				categoryService.updateCategoryDetails(dto,categoryId));
	}

}
