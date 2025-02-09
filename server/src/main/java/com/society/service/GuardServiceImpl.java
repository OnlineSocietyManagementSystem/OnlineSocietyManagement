package com.society.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.GuardDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.GuardDto;
import com.society.pojos.SecurityGuard;
import com.society.pojos.User;

import jakarta.validation.Valid;


@Service
@Transactional
public class GuardServiceImpl implements GuardService{
	
	@Autowired
	private GuardDao guardDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;


	@Override
	public ApiResponse addGuard(@Valid GuardDto guardDto, String email) {
		 Optional<User> optionalUser = userDao.findByEmail(email);

		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		   User user= optionalUser.get();
		   
		   SecurityGuard guard =mapper.map(guardDto, SecurityGuard.class);
		   
		   guard.setUser(user);
		
		   guardDao.save(guard);
		return new ApiResponse("Guard added successfully");
	}

}
