package com.society.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.society.pojos.PaymentStatus;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResDto extends BaseDto{

	    private BigDecimal amount;
	    private String paymentType;
	    private LocalDate dueDate;
	    private PaymentStatus status;
}
