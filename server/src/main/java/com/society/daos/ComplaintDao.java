package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Complaints;

public interface ComplaintDao extends JpaRepository<Complaints,Long> {

}
