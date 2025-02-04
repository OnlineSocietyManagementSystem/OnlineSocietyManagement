package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;


import com.society.pojos.Society;

public interface SocietyDao  extends  JpaRepository<Society, Long> {

	Society findBySocietyId(long l);
	
	

}
