package com.commerce.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.commerce.dao.CustomerDao;
import com.commerce.dao.OrderDao;
import com.commerce.dao.ProductDao;
import com.commerce.pojos.Customer;
import com.commerce.pojos.Order;
import com.commerce.pojos.Product;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	private ProductDao productDao;
	@Autowired
	private CustomerDao customerDao;
	@Autowired
	private OrderDao orderDao;
	
	

	@Override
	public String placeOrder(Long customerId, Long productId, int quantity) {
		Customer customer = customerDao.findById(customerId)
				.orElseThrow(() -> new RuntimeException("Customer not found"));
		
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new RuntimeException("product not found"));
		
		if(product.getStock() < quantity) {
			throw new RuntimeException("insufficient stock for product: " +product.getName());	
		}
		
		double totalAmount = quantity * product.getPrice();
		
		Order order = new Order();
		
		order.setCustomer(customer);
		order.setProduct(product);
		order.setQuantity(quantity);
		order.setTotalAmount(totalAmount);
		
		orderDao.save(order);
		
		product.setStock(product.getStock() - quantity);
		productDao.save(product);
		
		return "order placed successfully ... Order ID : " + order.getId();
	}



	@Override
	public String addProduct(String name, double price, int stock) {
		Product product = new Product(name, price, stock);
		productDao.save(product);
		return "Product added successfully";
	}



	@Override
	public String deleteProduct(Long productId) {
		Product product = productDao.findById(productId)
				.orElseThrow(() -> new RuntimeException("Product not found"));
		product.setStock(0);
		productDao.save(product);
		return "Product deleted successfully";
	}



	@Override
	public List<Product> getAllProducts() {
		return productDao.findAll();	
	}



	@Override
	public List<Order> getOrdersByDateRange(Date startDate, Date endDate) {
		
		return orderDao.findByCreatedDateBetween(startDate, endDate);
	}



	
}
