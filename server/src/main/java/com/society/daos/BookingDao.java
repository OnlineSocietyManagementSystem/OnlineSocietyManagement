package com.society.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Bookings;
import com.society.pojos.User;

public interface BookingDao extends JpaRepository<Bookings, Long> {

	List<Bookings> findByUser(User user);
}
