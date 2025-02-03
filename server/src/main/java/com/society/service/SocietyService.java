package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.SocietyDto;

import jakarta.validation.Valid;

public interface SocietyService {

	ApiResponse addSociety(@Valid SocietyDto societyDto, String email);
	

}
