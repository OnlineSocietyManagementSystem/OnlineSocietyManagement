package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Events;

public interface EventDao extends JpaRepository<Events, Long>  {

	

}
