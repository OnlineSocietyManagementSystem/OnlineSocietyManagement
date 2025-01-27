package com.blogs.service;

import com.blogs.dtos.ApiResponse;
import com.blogs.dtos.BlogPostReqDTO;

public interface BlogPostService {
//add blog post
	ApiResponse addNewBlog(BlogPostReqDTO dto);
}
