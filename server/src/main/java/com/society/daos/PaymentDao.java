package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Payment;
import com.society.pojos.PaymentStatus;
import com.society.pojos.User;

public interface PaymentDao extends JpaRepository<Payment, Long> {

	List<Payment> findByStatus(PaymentStatus unpaid);

	Optional<Payment> findFirstByUserAndStatus(User user, PaymentStatus unpaid);

	Optional<Payment> findFirstByStatus(PaymentStatus unpaid);

}
