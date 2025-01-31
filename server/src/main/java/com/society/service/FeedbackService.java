package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.FeedbackDto;

public interface FeedbackService {

	ApiResponse addFeedback(FeedbackDto dto, String email);

	List<FeedbackDto> getAllFeedbacks();

	void deleteFeedback(Long id);

}
