package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;


import com.society.pojos.Payment;

public interface PaymentDao extends JpaRepository<Payment, Long> {

}
