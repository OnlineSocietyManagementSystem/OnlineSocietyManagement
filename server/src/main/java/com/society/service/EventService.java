package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;
import com.society.dtos.EventResponseDto;



public interface EventService {

	ApiResponse addEvent( EventDto eventDto,String email);

	List<EventResponseDto> getAllEvents();

	void deleteEvent(Long id);

}
