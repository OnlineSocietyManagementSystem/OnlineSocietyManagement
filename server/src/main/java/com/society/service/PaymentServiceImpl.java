package com.society.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.MemberDao;
import com.society.daos.PaymentDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;
import com.society.pojos.Member;
import com.society.pojos.Payment;
import com.society.pojos.PaymentStatus;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService{

	@Autowired
	private PaymentDao paymentDao;
	@Autowired
	private MemberDao memberDao;
	//@Autowired
	//private PaymentDto paymentDto;
	@Override
	public ApiResponse makePayment(PaymentDto dto,String email) {
		 Optional<Member> optionalMember = memberDao.findByEmail(email);

		    if (!optionalMember.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		    Member member = optionalMember.get();

		    Payment payment = new Payment(
		        dto.getAmount(),
		        dto.getPaymentType(),
		        dto.getPaymentDate() != null ? dto.getPaymentDate() : LocalDate.now(),
		        PaymentStatus.PAID, // Automatically set to PAID
		        member
		    );

		    paymentDao.save(payment);
		    return new ApiResponse("Payment successfully recorded.");
		}
		
	}
	

