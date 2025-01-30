package com.society.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.Feedback;

public interface FeedbackDao extends JpaRepository<Feedback, Long> {

}
