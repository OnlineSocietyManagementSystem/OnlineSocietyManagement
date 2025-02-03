package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.ResourceRequestDto;
import com.society.dtos.ResourceResponseDto;

public interface ResourceService {

	ApiResponse addResource(ResourceRequestDto dto, String email);

	List<ResourceResponseDto> getAllResources();

	ApiResponse deleteResource(Long resourceId, String email);

}
