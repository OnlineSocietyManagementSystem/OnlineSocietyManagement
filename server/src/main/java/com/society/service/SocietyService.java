package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.SocietyDto;
import com.society.dtos.SocietyResponseDto;

import jakarta.validation.Valid;

public interface SocietyService {

	ApiResponse addSociety(@Valid SocietyDto societyDto, String email);

	List<SocietyResponseDto> getSocietyDetails();

	ApiResponse deleteSociety(Long societyId, String email);
	

}
