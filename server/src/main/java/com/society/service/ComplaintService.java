package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.ComplaintDto;

public interface ComplaintService {
	
	ApiResponse addComplaint(ComplaintDto dto,String email);


}
