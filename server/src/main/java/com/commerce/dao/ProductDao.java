package com.commerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.commerce.pojos.Product;

public interface ProductDao extends JpaRepository<Product, Long> {

}
