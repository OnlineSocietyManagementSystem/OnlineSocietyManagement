package com.society.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.PaymentDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.MyPaymentResDto;
import com.society.dtos.PaymentDto;
import com.society.dtos.PaymentResDto;
import com.society.pojos.Payment;
import com.society.pojos.PaymentStatus;
import com.society.pojos.User;
import com.society.pojos.UserRole;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentDao paymentDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse addPayment(PaymentDto dto, String email) {
		List<User> users = userDao.findByRole(UserRole.ROLE_MEMBER);

		if (users.isEmpty()) {
			return new ApiResponse("No members found in the society!");
		}

		users.forEach(user -> {
			Payment payment = modelMapper.map(dto, Payment.class);
			payment.setStatus(PaymentStatus.UNPAID);
			payment.setUser(user);
			paymentDao.save(payment);
		});

		return new ApiResponse("Payment entries created successfully for all members.");
	}

	@Override
	public List<PaymentResDto> getPayment(String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		if (optionalUser.isEmpty()) {
			throw new RuntimeException("User not found!");
		}
		User user = optionalUser.get();

		List<Payment> payments = paymentDao.findByUserIdAndStatus(user.getId(), PaymentStatus.UNPAID);

		return payments.stream().map(payment -> modelMapper.map(payment, PaymentResDto.class)) 
																								
				.collect(Collectors.toList());

	}

	@Override
	public List<MyPaymentResDto> getMyPayment(String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		if (optionalUser.isEmpty()) {
			throw new RuntimeException("User not found!");
		}
		User user = optionalUser.get();

		List<Payment> payments = paymentDao.findByUserId(user.getId());

		return payments.stream().map(payment -> modelMapper.map(payment, MyPaymentResDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<PaymentResDto> getAllPayments(String adminEmail) {
		List<Payment> payments = paymentDao.findAll();

		return payments.stream().map(payment -> modelMapper.map(payment, PaymentResDto.class))
				.collect(Collectors.toList());

	}

	@Override
	public ApiResponse makePayment(Long id, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
		if (optionalUser.isEmpty()) {
			throw new RuntimeException("User not found!");
		}

		User user = optionalUser.get();
		Optional<Payment> optionalPayment = paymentDao.findById(id);

		if (optionalPayment.isEmpty()) {
			throw new RuntimeException("Payment not found!");
		}

		Payment payment = optionalPayment.get();

		if (!payment.getUser().getId().equals(user.getId())) {
			throw new RuntimeException("This payment does not belong to the logged-in user.");
		}

		if (payment.getStatus() == PaymentStatus.PAID) {
			return new ApiResponse("This payment has already been processed.");
		}

		payment.setStatus(PaymentStatus.PAID);
		payment.setPaymentDate(LocalDate.now());
		paymentDao.save(payment);

		return new ApiResponse("Payment successfully made for the specified due.");

	}

}
