package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exceptions.ResourceNotFoundException;
import com.society.daos.BookingDao;

import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.BookingDto;
import com.society.dtos.BookingRespDto;
import com.society.pojos.BookingStatus;
import com.society.pojos.Bookings;
import com.society.pojos.Resources;
import com.society.pojos.User;
import com.society.pojos.UserRole;
import com.society.pojos.AvailabilityStatus;

import jakarta.validation.Valid;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingDao bookingDao;

	@Autowired
	private ResourceDao resourceDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addBooking(@Valid BookingDto bookingDto, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		Optional<Resources> optionalResource = resourceDao.findById(bookingDto.getResourceId());

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}

		if (!optionalResource.isPresent()) {
			return new ApiResponse("Resource not found!");
		}

		User user = optionalUser.get();
		Resources resource = optionalResource.get();

		// Check if the resource is already booked
		if (resource.getStatus() == AvailabilityStatus.UNAVAILABLE) {
			return new ApiResponse("Resource is already booked!");
		}

		// Map DTO to entity
		Bookings booking = mapper.map(bookingDto, Bookings.class);
		booking.setUser(user);
		booking.setResource(resource);
		booking.setStatus(BookingStatus.PENDING); // Default booking status

		// Mark resource as unavailable
		resource.setStatus(AvailabilityStatus.UNAVAILABLE);

		bookingDao.save(booking);
		resourceDao.save(resource);

		return new ApiResponse("Booking request sent successfully, pending approval.");
	}


	@Override
	public ApiResponse confirmBooking(Long bookingId) {
	    Bookings booking = bookingDao.findById(bookingId)
	        .orElseThrow(() -> new ResourceNotFoundException("Booking not found!"));

	    booking.setStatus(BookingStatus.CONFIRMED);
	    booking.getResource().setStatus(AvailabilityStatus.UNAVAILABLE); // Mark resource as unavailable
	    bookingDao.save(booking);

	    return new ApiResponse("Booking confirmed successfully.");
	}




	@Override
	public List<BookingRespDto> getBookingsByRole(String email) {
	    User user = userDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

	    List<Bookings> bookings;
	    
	    if (user.getRole().equals(UserRole.ROLE_ADMIN)) {
	        bookings = bookingDao.findAll();
	    } else {
	        bookings = bookingDao.findByUser(user);
	    }

	    return bookings.stream()
	        .map(booking -> {
	            BookingRespDto dto = mapper.map(booking, BookingRespDto.class);
	            dto.setResourceType(booking.getResource().getResourceType()); 
	            dto.setUserEmail(booking.getUser().getEmail());
	            return dto;
	        })
	        .collect(Collectors.toList());
	}




	@Override
	public ApiResponse cancelBooking(Long bookingId, String email) {
	    User user = userDao.findByEmail(email)
	        .orElseThrow(() -> new ResourceNotFoundException("User not found!"));

	    Bookings booking = bookingDao.findById(bookingId)
	        .orElseThrow(() -> new ResourceNotFoundException("Booking not found!"));

	    // Admin can cancel any booking, Member can cancel only their own
	    if (user.getRole().equals(UserRole.ROLE_ADMIN) || booking.getUser().equals(user)) {
	        booking.setStatus(BookingStatus.CANCELLED);
	        booking.getResource().setStatus(AvailabilityStatus.AVAILABLE); // Free the resource
	        bookingDao.save(booking);
	        return new ApiResponse("Booking canceled successfully.");
	    } else {
	        return new ApiResponse("Unauthorized access!");
	    }
	}



}
