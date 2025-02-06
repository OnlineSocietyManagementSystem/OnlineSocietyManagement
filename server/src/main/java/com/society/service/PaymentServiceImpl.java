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
    public ApiResponse addPayment(PaymentDto dto, String adminEmail) {
        List<User> users = userDao.findAll();

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
        
        return payments.stream()
                .map(payment -> modelMapper.map(payment, PaymentResDto.class)) // Using ModelMapper to map Payment to DTO
                .collect(Collectors.toList());
    }

    @Override
    public ApiResponse makePayment(String email) {
        Optional<User> optionalUser = userDao.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }

        User user = optionalUser.get();
        List<Payment> unpaidPayments = paymentDao.findByUserIdAndStatus(user.getId(), PaymentStatus.UNPAID);

        if (unpaidPayments.isEmpty()) {
            return new ApiResponse("No unpaid payments found!");
        }

        unpaidPayments.forEach(payment -> {
            payment.setStatus(PaymentStatus.PAID);
            payment.setPaymentDate(LocalDate.now());
        });

        paymentDao.saveAll(unpaidPayments);

        return new ApiResponse("Payment successful for all pending dues.");
    }

    @Override
    public List<MyPaymentResDto> getMyPayment(String email) {
        Optional<User> optionalUser = userDao.findByEmail(email);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found!");
        }
        User user = optionalUser.get();

        List<Payment> payments = paymentDao.findByUserId(user.getId());

        return payments.stream()
                .map(payment -> modelMapper.map(payment, MyPaymentResDto.class)) 
                .collect(Collectors.toList());
    }

    public List<PaymentResDto> getAllPayments(String adminEmail) {
        List<Payment> payments = paymentDao.findAll();

        return payments.stream()
                .map(payment -> modelMapper.map(payment, PaymentResDto.class))
                .collect(Collectors.toList());
    }
}
