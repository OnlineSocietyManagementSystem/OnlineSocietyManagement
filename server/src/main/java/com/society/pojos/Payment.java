package com.society.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

	
	
	private double amount;
	
	@Column(name="payment_type")
	private String paymentType;
	
	@Column(name="payment_date")
	private LocalDate paymentDate;
	
	private boolean status;
	
	
	public Payment(double amount, String paymentType, LocalDate paymentDate, boolean status, User member) {
		super();
		this.amount = amount;
		this.paymentType = paymentType;
		this.paymentDate = paymentDate;
		this.status = status;
		this.member = member;
	}


	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private User member;
	
	
	
}
