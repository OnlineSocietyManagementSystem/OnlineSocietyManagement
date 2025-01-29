package com.society.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Member;

public interface AuthDao extends JpaRepository<Member, Long> {
	boolean existsByEmail(String email);
	
	Optional<Member> findByEmail(String email);

}
