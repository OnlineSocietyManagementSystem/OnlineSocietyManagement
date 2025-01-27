package com.society.pojos;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment extends BaseEntity{

	@ManyToOne
	@JoinColumn(name = "member_id",nullable = false)
	private Member member;
	
	
	private double amount;
	
	@Column(name="payment_type")
	private String paymentType;
	@Column(name="payment_date")
	private LocalDate paymentDate;
	private boolean status;
	
}
