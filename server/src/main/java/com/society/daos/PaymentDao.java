package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Payment;
import com.society.pojos.PaymentStatus;

public interface PaymentDao extends JpaRepository<Payment, Long> {

    
    // Get all unpaid payments for a specific user
    List<Payment> findByUserIdAndStatus(Long userId, PaymentStatus status);

    // Get all payments (paid/unpaid) for a specific user
    List<Payment> findByUserId(Long userId);
}
