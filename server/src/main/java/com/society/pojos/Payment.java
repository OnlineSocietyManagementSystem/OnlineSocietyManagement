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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
public class Payment extends BaseEntity {

	private BigDecimal amount;

	@Column(name = "payment_type")
	private String paymentType;

	@Column(name = "payment_date")
	private LocalDate paymentDate;

	@Column(name = "due_date")
	private LocalDate dueDate;
	@Enumerated(EnumType.STRING) // Store as String in DB
	private PaymentStatus status;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	// Constructor for creating UNPAID payments
	public Payment(BigDecimal amount, String paymentType, LocalDate dueDate, User user) {
		this.amount = amount;
		this.paymentType = paymentType;
		this.dueDate = dueDate;
		this.status = PaymentStatus.UNPAID; // Default status
		this.user = user;
	}
	
	public void markAsPaid() {
        this.status = PaymentStatus.PAID;
        this.paymentDate = LocalDate.now(); // Set payment date when paid
    }

}
