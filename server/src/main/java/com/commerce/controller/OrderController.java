package com.commerce.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.commerce.pojos.Order;
import com.commerce.pojos.Product;
import com.commerce.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	public OrderController() {
		System.out.println("in order controller ctor");
	}
	
	@PostMapping("/addProduct")
	public ResponseEntity<?> addProduct(
			@RequestParam String name,
			@RequestParam double price,
			@RequestParam int stock){
		
		String message = orderService.addProduct(name, price, stock);
		return ResponseEntity.ok(message);
	}
	
	@PostMapping("/deleteProduct")
	public ResponseEntity<String> deleteProduct(@RequestParam Long productId){
		String message = orderService.deleteProduct(productId);
		return ResponseEntity.ok(message);
	}
	
	@GetMapping("/getProducts")
	public ResponseEntity<List<Product>> getAllProducts(){
		List<Product> products = orderService.getAllProducts();
		return ResponseEntity.ok(products);
	}
	
	@PostMapping("/placeOrder")
	public ResponseEntity<String> placeorder(
			@RequestParam Long customerId,
			@RequestParam Long productId,
			@RequestParam int quantity){
			
		try {
			String message = orderService.placeOrder(customerId, productId, quantity);
			return ResponseEntity.ok(message);
		} catch(RuntimeException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@GetMapping("/getOrders")
	public ResponseEntity<List<Order>> getOrderByDateRange(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
			                       						   @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
		List<Order> orders = orderService.getOrdersByDateRange(startDate, endDate);
		return ResponseEntity.ok(orders);
	}
	
	
}
