package com.society.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.*;


@NoArgsConstructor
@ToString

public class PaymentDto {
	
	    @JsonProperty("amount")
	    private BigDecimal amount;
	    @JsonProperty("paymentType")
	    private String paymentType;
	    @JsonProperty("paymentDate")
	    private LocalDate paymentDate;
	    private Long memberId;
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
		public Long getMemberId() {
			return memberId;
		}
		public void setMemberId(Long memberId) {
			this.memberId = memberId;
		}
		public PaymentDto(BigDecimal amount, String paymentType, LocalDate paymentDate, Long memberId) {
			super();
			this.amount = amount;
			this.paymentType = paymentType;
			this.paymentDate = paymentDate;
			this.memberId = memberId;
		}
	    
	    
		
		
		
	    
}
