package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Bookings;

public interface BookingDao extends JpaRepository<Bookings, Long> {

}
