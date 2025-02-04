package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.BookingDto;
import com.society.dtos.BookingRespDto;


import jakarta.validation.Valid;

public interface BookingService {

	ApiResponse addBooking(@Valid BookingDto bookingDto, String email);

	List<BookingRespDto> getAllBookings();

}
