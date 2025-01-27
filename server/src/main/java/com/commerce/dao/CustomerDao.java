package com.commerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.pojos.Customer;

public interface CustomerDao extends JpaRepository<Customer, Long> {

}
