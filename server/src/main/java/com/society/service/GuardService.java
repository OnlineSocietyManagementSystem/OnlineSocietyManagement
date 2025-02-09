package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.GuardDto;

import jakarta.validation.Valid;

public interface GuardService {

	ApiResponse addGuard(@Valid GuardDto guardDto, String email);

}
