package com.society.service;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Resources;

public interface ResourceDao extends JpaRepository<Resources, Long> {

}
