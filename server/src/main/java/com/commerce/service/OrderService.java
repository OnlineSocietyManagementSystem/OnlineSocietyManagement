package com.commerce.service;

import java.util.Date;
import java.util.List;

import com.commerce.pojos.Order;
import com.commerce.pojos.Product;

public interface OrderService {

	String placeOrder(Long customerId, Long productId, int quantity);

	String addProduct(String name, double price, int stock);

	String deleteProduct(Long productId);

	List<Product> getAllProducts();

	List<Order> getOrdersByDateRange(Date startDate, Date endDate);

	
}
