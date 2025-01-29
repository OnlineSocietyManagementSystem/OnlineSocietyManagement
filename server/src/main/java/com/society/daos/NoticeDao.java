package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Notices;


public interface NoticeDao extends JpaRepository<Notices, Long>{

}
