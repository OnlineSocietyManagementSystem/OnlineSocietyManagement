package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.User;
import com.society.pojos.UserRole;

public interface UserDao extends JpaRepository<User, Long> {
	boolean existsByEmail(String email);
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findById(Long userId);
	
	List<User> findByRole(UserRole role);

}
