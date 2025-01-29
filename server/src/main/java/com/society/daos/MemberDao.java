package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Member;

public interface MemberDao extends JpaRepository<Member, Long> {
	boolean existsByEmail(String email);
}
