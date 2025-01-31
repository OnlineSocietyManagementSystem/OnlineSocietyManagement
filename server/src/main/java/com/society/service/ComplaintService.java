package com.society.service;

import java.util.List;
import java.util.Optional;
import com.society.dtos.ApiResponse;
import com.society.dtos.ComplaintDto;
import com.society.dtos.ComplaintResDto;

public interface ComplaintService {
	
	ApiResponse addComplaint(ComplaintDto dto,String email);
	List<ComplaintResDto> getAllComplaints();
    Optional<ComplaintDto> getComplaintById(Long complaintId);


}
