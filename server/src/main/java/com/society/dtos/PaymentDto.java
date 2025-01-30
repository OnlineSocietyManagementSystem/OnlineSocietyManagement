package com.society.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.*;


@NoArgsConstructor
@ToString

public class PaymentDto extends BaseDto {
	
	    @JsonProperty("amount")
	    private BigDecimal amount;
	    @JsonProperty("paymentType")
	    private String paymentType;
	    @JsonProperty("paymentDate")
	    private LocalDate paymentDate;
	    private Long userId;
		public BigDecimal getAmount() {
			return amount;
		}
		public void setAmount(BigDecimal amount) {
			this.amount = amount;
		}
		public String getPaymentType() {
			return paymentType;
		}
		public void setPaymentType(String paymentType) {
			this.paymentType = paymentType;
		}
		public LocalDate getPaymentDate() {
			return paymentDate;
		}
		public void setPaymentDate(LocalDate paymentDate) {
			this.paymentDate = paymentDate;
		}
		public Long getUserId() {
			return userId;
		}
		public void setUserId(Long userId) {
			this.userId = userId;
		}
		public PaymentDto(BigDecimal amount, String paymentType, LocalDate paymentDate, Long userId) {
			super();
			this.amount = amount;
			this.paymentType = paymentType;
			this.paymentDate = paymentDate;
			this.userId = userId;
		}
	    
	    
		
		
		
	    
}
