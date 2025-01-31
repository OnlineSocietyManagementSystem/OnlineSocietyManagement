package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.FeedbackDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.FeedbackDto;
import com.society.pojos.Feedback;
import com.society.pojos.User;

@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

	@Autowired
	private FeedbackDao feedbackDao;

	@Autowired
	private UserDao userDao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public ApiResponse addFeedback(FeedbackDto feedbackDto, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}
		
		User user = optionalUser.get();
		
		Feedback feedback = mapper.map(feedbackDto, Feedback.class);
		
		feedback.setUser(user);
		
		feedbackDao.save(feedback);
		
		return new ApiResponse("Feedback send successfully");
	
	}

	@Override
	public List<FeedbackDto> getAllFeedbacks() {
		return feedbackDao.findAll().stream()
                .map(feedback -> mapper.map(feedback, FeedbackDto.class))
                .collect(Collectors.toList());
	}

	@Override
	public void deleteFeedback(Long id) {
		feedbackDao.deleteById(id);
	}

}
