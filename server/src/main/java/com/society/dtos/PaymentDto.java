package com.society.dtos;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class PaymentDto {
	
	    private double amount;
	    private String paymentType;
	    private LocalDate paymentDate;
	    private Long memberId;
	    
		public PaymentDto(double amount, String paymentType, LocalDate paymentDate, Long memberId) {
			super();
			this.amount = amount;
			this.paymentType = paymentType;
			this.paymentDate = paymentDate;
			this.memberId = memberId;
		}
	    
}
