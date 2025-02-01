package com.society.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.PaymentDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.MakePaymentDto;
import com.society.dtos.PaymentDto;
import com.society.dtos.PaymentResDto;
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
     private ModelMapper modelMapper; 
	 
	@Override
	public ApiResponse addPayment(PaymentDto dto,String email) {
		 Optional<User> optionalUser = userDao.findByEmail(email);

		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		     User user= optionalUser.get();
		      Payment payment = modelMapper.map(dto, Payment.class);
	        // Manually set properties that are not in DTO
	       // payment.setPaymentDate(dto.getDueDate()!= null ? dto.getDueDate(): LocalDate.now());
	        payment.setStatus(PaymentStatus.PAID);
	        paymentDao.save(payment);
		    return new ApiResponse("Payment Posted Successfully..");
	}

	@Override
	public List<PaymentResDto> getPayment(String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		 User user= optionalUser.get();
//		     PaymentStatus unpaid;
//		     {
//		         unpaid = PaymentStatus.valueOf("UNPAID");
//		     }
		     // Enum names are usually uppercase
		     List<Payment> payments=paymentDao.findByStatus(PaymentStatus.UNPAID);
		     return payments.stream()
		    	        .map(payment -> new PaymentResDto(payment.getAmount(),payment.getPaymentType(),payment.getDueDate(),payment.getStatus()))
		    	        .collect(Collectors.toList());		
	}

	@Override
	public ApiResponse makePayment(String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		 User user= optionalUser.get();
		 Optional<Payment> optionalUnpaidPayment = paymentDao.findFirstByStatus(PaymentStatus.UNPAID);
	        if (optionalUnpaidPayment.isEmpty()) {
	            throw new RuntimeException("No unpaid payment found!");
	        }
	        Payment unpaidPayment = optionalUnpaidPayment.get();

	        //Create a new payment entry with the same details but linked to the user
	        Payment payment = new Payment();
	        payment.setAmount(unpaidPayment.getAmount());
	        payment.setPaymentType(unpaidPayment.getPaymentType());
	        payment.setDueDate(unpaidPayment.getDueDate());
	        payment.setStatus(PaymentStatus.PAID);
	        payment.setUser(user);  // Assign the logged-in user
	        payment.setPaymentDate(LocalDate.now()); // Set current date

	        // ✅ Save the new payment record
	        paymentDao.save(payment);
		 return new ApiResponse("Payment Done Successfully..");
	}
		
	}
	

