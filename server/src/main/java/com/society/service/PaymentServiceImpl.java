package com.society.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.PaymentDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;
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
	//@Autowired
	//private PaymentDto paymentDto;
	@Override
	public ApiResponse makePayment(PaymentDto dto,String email) {
		 Optional<User> optionalUser = userDao.findByEmail(email);
            System.out.println(dto.getAmount()+" "+dto.getPaymentType());
		    if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		   User user= optionalUser.get();
             
		    Payment payment = new Payment(
		        dto.getAmount(),
		        dto.getPaymentType(),
		        dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDate.now(),
		        PaymentStatus.PAID, // Automatically set to PAID
		        user
		    );

		    paymentDao.save(payment);
		    return new ApiResponse("Payment successfully Done..");
		}
		
	}
	

