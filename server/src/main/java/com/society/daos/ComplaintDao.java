package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.society.pojos.Complaints;
import com.society.pojos.ActivityStatus;

@Repository
public interface ComplaintDao extends JpaRepository<Complaints,Long> {

	List<Complaints> findByUserId(Long userId);
	List<Complaints> findByActivityStatus(ActivityStatus ACTIVE);
	List<Complaints> findByUserIdAndActivityStatus(Long userId,ActivityStatus ACTIVE);

}
