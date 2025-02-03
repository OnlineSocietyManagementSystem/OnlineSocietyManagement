package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.ResourceDto;

public interface ResourceService {

	ApiResponse addResource(ResourceDto dto, String email);

}
