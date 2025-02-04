package com.society.dtos;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MakePaymentDto extends PaymentDto {
	private LocalDate paymentDto;
	private Long userId;

}
