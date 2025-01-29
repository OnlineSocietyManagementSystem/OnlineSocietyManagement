package com.society.pojos;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="payments")
public class Payment extends BaseEntity{

	
	
	private BigDecimal amount;
	
	@Column(name="payment_type")
	private String paymentType;
	
	@Column(name="payment_date")
	private LocalDate paymentDate;
	
	@Enumerated(EnumType.STRING)  // Store as String in DB
    private PaymentStatus status;
	
	
	public Payment(BigDecimal bigDecimal, String paymentType, LocalDate paymentDate, PaymentStatus status, Member member) {
		super();
		this.amount = bigDecimal;
		this.paymentType = paymentType;
		this.paymentDate = paymentDate;
		this.status = status;
		this.member = member;
	}


	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private Member member;
	
	
	
}
