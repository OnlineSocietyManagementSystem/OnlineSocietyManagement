package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exception.ApiException;
import com.society.daos.EventDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.dtos.EventResponseDto;
import com.society.pojos.Events;
import com.society.pojos.User;

import jakarta.validation.Valid;


@Service
@Transactional
public class EventServiceImpl implements EventService{
	
	
	@Autowired
	private EventDao eventDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addEvent(@Valid EventDto eventDto,String email) {
		
		 Optional<User> optionalUser = userDao.findByEmail(email);

		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		   User user= optionalUser.get();
		   
		   Events event =mapper.map(eventDto, Events.class);
		   
		   event.setUser(user);
		
//		if(eventDto.getUserId() != null) {
//			User user = userDao.findById(eventDto.getUserId()).orElseThrow(() -> new ApiException("User not found"));
//			event.setUser(user);
//		}
		
		eventDao.save(event);
		return new ApiResponse("Event added successfully");
	}

	@Override
	public List<EventResponseDto> getAllEvents() {
		
		return eventDao.findAll()
				.stream()
				.map(event -> 
				mapper.map(event, EventResponseDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public void deleteEvent(Long id) {
		 eventDao.deleteById(id);	
	}

}
