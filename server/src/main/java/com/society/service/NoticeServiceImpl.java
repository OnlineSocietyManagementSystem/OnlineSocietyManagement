package com.society.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exception.ApiException;
import com.society.daos.NoticeDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.NoticeDto;

import com.society.pojos.Notices;
import com.society.pojos.User;

import jakarta.validation.Valid;


@Service
@Transactional
public class NoticeServiceImpl implements NoticeService  {

	
	@Autowired
	private NoticeDao noticeDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private UserDao userDao;
	
	@Override
	public ApiResponse addNotice(@Valid NoticeDto noticeDto,String email) {
		
		 Optional<User> optionalUser = userDao.findByEmail(email);
		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }

		 User user= optionalUser.get();
		 
		Notices notice =mapper.map(noticeDto, Notices.class);
		
		 notice.setUser(user);
		 
//		if(noticeDto.getUserId() != null) {
//			User user = userDao.findById(noticeDto.getUserId()).orElseThrow(() -> new ApiException("User not found"));
//			notice.setUser(user);
//		}
		noticeDao.save(notice);
		return new ApiResponse("notice added successfully");
		
	}

}
