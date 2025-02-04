package com.society.service;

import java.util.List;

import com.society.dtos.ApiResponse;
import com.society.dtos.NoticeDto;
import com.society.dtos.NoticeRespDto;
//import com.society.dtos.NoticeRespDto;
import com.society.pojos.Notices;

import jakarta.validation.Valid;

public interface NoticeService {

	ApiResponse addNotice(@Valid NoticeDto noticeDto,String email);

	List<NoticeRespDto> getAllNotices();
	
	ApiResponse deleteNotice(Long id, String email);

}
