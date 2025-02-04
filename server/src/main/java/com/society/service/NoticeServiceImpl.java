package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.NoticeDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.EventResponseDto;
import com.society.dtos.NoticeDto;
import com.society.dtos.NoticeRespDto;
import com.society.pojos.Notices;
import com.society.pojos.User;

import jakarta.validation.Valid;

@Service
@Transactional
public class NoticeServiceImpl implements NoticeService {

	@Autowired
	private NoticeDao noticeDao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private UserDao userDao;

	@Override
	public ApiResponse addNotice(@Valid NoticeDto noticeDto, String email) {

		Optional<User> optionalUser = userDao.findByEmail(email);
		if (!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}

		User user = optionalUser.get();

		Notices notice = mapper.map(noticeDto, Notices.class);

		notice.setUser(user);

//		if(noticeDto.getUserId() != null) {
//			User user = userDao.findById(noticeDto.getUserId()).orElseThrow(() -> new ApiException("User not found"));
//			notice.setUser(user);
//		}
		noticeDao.save(notice);
		return new ApiResponse("notice added successfully");

	}

	@Override
	public List<NoticeRespDto> getAllNotices() {
		return noticeDao.findAll().stream().map(notice -> mapper.map(notice, NoticeRespDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteNotice(Long id, String email) {

		Optional<User> optionalUser = userDao.findByEmail(email);

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Unauthorized access!");
		}

		Optional<Notices> optionalNotices = noticeDao.findById(id);
		if (!optionalNotices.isPresent()) {
			return new ApiResponse("Notice not found");
		}

		noticeDao.delete(optionalNotices.get());

		return new ApiResponse("notice deleted successfully");

	}

}
