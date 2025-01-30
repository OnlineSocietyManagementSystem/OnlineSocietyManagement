package com.society.service;

import java.time.LocalDate;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.PaymentDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;
import com.society.pojos.Complaints;
import com.society.pojos.Payment;
import com.society.pojos.PaymentStatus;
import com.society.pojos.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	private PaymentDao paymentDao;
	@Autowired
	private UserDao userDao;
	 @Autowired
     private ModelMapper modelMapper; //
	@Override
	public ApiResponse makePayment(PaymentDto dto,String email) {
		 Optional<User> optionalUser = userDao.findByEmail(email);
            System.out.println(dto.getAmount()+" "+dto.getPaymentType());
		    if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		   User user= optionalUser.get();

	        // Convert DTO to Entity using ModelMapper
		   Payment payment = modelMapper.map(dto, Payment.class);
	        
	        // Manually set properties that are not in DTO
	        payment.setPaymentDate(dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDate.now());
	        payment.setStatus(PaymentStatus.PAID); // Automatically set status
	        payment.setUser(user); 

		    paymentDao.save(payment);
		    return new ApiResponse("Payment successfully Done..");
		}
		
	}
	

