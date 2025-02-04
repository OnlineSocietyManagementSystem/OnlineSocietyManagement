package com.society.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyPaymentResDto {
	
	   private BigDecimal amount;
	   private String paymentType;
	   private LocalDate paymentDate;
	    
}
