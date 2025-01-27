package com.commerce.dao;
import java.util.Date;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.pojos.Order;

public interface OrderDao extends JpaRepository<Order, Long> {

	List<Order> findByCreatedDateBetween(Date startDate, Date endDate);
}
