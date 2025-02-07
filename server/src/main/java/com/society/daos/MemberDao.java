package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.society.pojos.User;

import java.util.List;
@Repository
public interface MemberDao extends JpaRepository<User, Long> {

    // Custom query to fetch only "MEMBER" roles
    @Query("SELECT m FROM User m WHERE m.role = 'ROLE_MEMBER'")
    List<User> findAllMembers();
}
