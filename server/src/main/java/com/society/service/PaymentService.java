package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.PaymentDto;

public interface PaymentService {
	ApiResponse makePayment(PaymentDto dto,String email);

}
