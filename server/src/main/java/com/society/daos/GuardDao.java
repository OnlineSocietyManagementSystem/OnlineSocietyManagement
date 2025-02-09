package com.society.daos;
import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.SecurityGuard;
public interface GuardDao extends JpaRepository<SecurityGuard,Long>{

}
