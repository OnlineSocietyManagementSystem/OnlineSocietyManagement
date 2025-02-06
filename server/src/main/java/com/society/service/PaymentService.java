package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.MakePaymentDto;
import com.society.dtos.MyPaymentResDto;
import com.society.dtos.PaymentDto;
import com.society.dtos.PaymentResDto;

public interface PaymentService {
	ApiResponse addPayment(PaymentDto dto,String email);
	List<PaymentResDto> getPayment(String email);
	ApiResponse makePayment(String email);
	List<MyPaymentResDto> getMyPayment(String email);
	List<PaymentResDto> getAllPayments(String adminEmail);
	

}
