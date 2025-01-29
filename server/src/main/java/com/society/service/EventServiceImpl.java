package com.society.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.EventDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.pojos.Events;

//import jakarta.validation.Valid;

@Service
@Transactional
public class EventServiceImpl implements EventService{
	
	
	@Autowired
	private EventDao eventDao;
	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addEvent( EventDto eventDto) {
		Events event =mapper.map(eventDto, Events.class);
		eventDao.save(event);
		return new ApiResponse("event added successfully");
	}

}
