package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.ComplaintDto;

public interface ComplaintService {
	
	ApiResponse addComplaint(ComplaintDto dto,String email);

}
