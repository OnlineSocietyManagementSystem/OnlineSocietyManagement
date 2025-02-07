package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.SecurityGuard;

public interface SecurityGuardDao extends JpaRepository<SecurityGuard, Long>{

}
