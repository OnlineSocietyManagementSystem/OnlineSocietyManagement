package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Guest;

public interface GuestDao extends JpaRepository<Guest, Long>{

}
