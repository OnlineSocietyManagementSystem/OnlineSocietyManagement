package com.blogs.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;

import com.blogs.custom_exception.ResourceNotFoundException;
import com.blogs.dao.BlogPostDao;
import com.blogs.dao.CategoryDao;
import com.blogs.dao.UserDao;
import com.blogs.dtos.ApiResponse;
import com.blogs.dtos.BlogPostReqDTO;
import com.blogs.pojos.BlogPost;
import com.blogs.pojos.Category;
import com.blogs.pojos.User;

@Service
@Transactional
public class BlogPostServiceImpl implements BlogPostService {
	//depcy   - blog post dao
	@Autowired
	private BlogPostDao blogPostDao;
	//depcy user dao
	@Autowired
	private UserDao userDao;
	//depcy category dao
	@Autowired
	private CategoryDao categoryDao;
	@Autowired
	private ModelMapper modelMapper;
	

	@Override
	public ApiResponse addNewBlog(BlogPostReqDTO dto) {
		//1. get Blogger from its id
		User blogger=userDao.findById(dto.getBloggerId()).
				orElseThrow(() -> 
		new ResourceNotFoundException("Blogger id invalid!!"));
		//2. get category from its id
		Category category=categoryDao.findById(dto.getCategoryId())
				.orElseThrow(() -> 
				new ResourceNotFoundException("Category id invalid!!"));
		//=> blogger n category : persistent
		//3. map dto --> entity
		BlogPost blogPostEnt = modelMapper.map(dto, BlogPost.class);
		//4. Category  1<---->* BlogPost
		category.addBlogPost(blogPostEnt);
		//BlogPost *--->1 Blogger(User)
		blogPostEnt.setBlogger(blogger); 
		blogPostEnt.setStatus(true);
		//5. save
	//	blogPostDao.save(blogPostEnt);not required since cascadeType.ALL
		return new ApiResponse("new blog post added!!!");
	}

}
