package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.BookingDao;

import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.BookingDto;
import com.society.dtos.BookingRespDto;
import com.society.dtos.EventResponseDto;
import com.society.pojos.Bookings;
import com.society.pojos.Events;
import com.society.pojos.User;

import jakarta.validation.Valid;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingDao bookingDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addBooking(@Valid BookingDto bookingDto, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}

		User user = optionalUser.get();

		Bookings booking = mapper.map(bookingDto, Bookings.class);

		booking.setUser(user);

		bookingDao.save(booking);
		
		return new ApiResponse("Booking request send successfully");
	}

	@Override
	public List<BookingRespDto> getAllBookings(String email) {
		return bookingDao.findAll().stream().map(booking -> mapper.map(booking, BookingRespDto.class))
				.collect(Collectors.toList());
	}

}
