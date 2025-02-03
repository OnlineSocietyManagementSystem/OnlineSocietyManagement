package com.society.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.ResourceDto;
import com.society.pojos.Resources;
import com.society.pojos.User;

public class ResourceServiceImpl implements ResourceService{
	
	@Autowired
	private ResourceDao resourceDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserDao userDao;

	@Override
	public ApiResponse addResource(ResourceDto dto, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		
		if(!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}
		
		User user = optionalUser.get();
		
		Resources resource = mapper.map(dto, Resources.class);
		
		
	}

}
