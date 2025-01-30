package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.EventDto;



public interface EventService {

	ApiResponse addEvent( EventDto eventDto);

}
