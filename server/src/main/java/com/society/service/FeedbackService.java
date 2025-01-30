package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.FeedbackDto;

public interface FeedbackService {

	ApiResponse addFeedback(FeedbackDto dto, String email);

}
