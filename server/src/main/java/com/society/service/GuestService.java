package com.society.service;


import com.society.dtos.ApiResponse;
import com.society.dtos.GuestDto;
import com.society.dtos.GuestVerificationRequestDTO;


public interface GuestService {

	String requestGuestApproval(GuestVerificationRequestDTO request);

	String approveGuestEntry(Long entryId, boolean isApproved);

	ApiResponse addGuest(GuestDto guestDTO,String email);	

}
