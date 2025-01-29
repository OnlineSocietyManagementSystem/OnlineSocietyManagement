package com.society.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.society.daos.NoticeDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.NoticeDto;

import com.society.pojos.Notices;

import jakarta.validation.Valid;


@Service
@Transactional
public class NoticeServiceImpl implements NoticeService  {

	
	@Autowired
	private NoticeDao noticeDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public ApiResponse addNotice(@Valid NoticeDto noticeDto) {
		Notices notice =mapper.map(noticeDto, Notices.class);
		noticeDao.save(notice);
		return new ApiResponse("notice added successfully");
		
	}

}
