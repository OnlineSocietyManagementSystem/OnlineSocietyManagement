package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.society.pojos.Complaints;

@Repository
public interface ComplaintDao extends JpaRepository<Complaints,Long> {

	List<Complaints> findByUserId(Long userId);

}
