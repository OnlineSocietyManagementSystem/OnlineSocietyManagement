package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.society.pojos.ActivityStatus;
import com.society.pojos.Events;
import com.society.pojos.User;
@Repository
public interface EventDao extends JpaRepository<Events, Long>  {

	
	List<Events> findByStatus(ActivityStatus ACTIVE);


	

}
