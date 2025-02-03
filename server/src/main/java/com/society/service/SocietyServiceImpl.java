package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.SocietyDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.EventResponseDto;
import com.society.dtos.SocietyDto;
import com.society.dtos.SocietyResponseDto;
import com.society.pojos.Events;
import com.society.pojos.Society;
import com.society.pojos.User;

import jakarta.validation.Valid;


@Service
@Transactional
public class SocietyServiceImpl implements SocietyService {
	
	@Autowired
	private SocietyDao societyDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addSociety(@Valid SocietyDto societyDto, String email) {
		
		
		Optional<User> optionalUser = userDao.findByEmail(email);
		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }
		 
		 User user= optionalUser.get();
		   
		   Society society =mapper.map(societyDto, Society.class);
		   
		   society.setUser(user);
		   
		   societyDao.save(society);
			return new ApiResponse("Society added successfully");
	}

	@Override
	public List<SocietyResponseDto> getSocietyDetails() {
		return societyDao.findAll()
				.stream()
				.map(society -> 
				mapper.map(society, SocietyResponseDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteSociety(Long societyId, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);

        if (!optionalUser.isPresent()) {
            return new ApiResponse("Unauthorized access!");
        }

        Optional<Society> optionalEvent = societyDao.findById(societyId);
        if (!optionalEvent.isPresent()) {
            return new ApiResponse("Society not found!");
        }

        societyDao.delete(optionalEvent.get());
        return new ApiResponse("Society deleted successfully");
	}

}
