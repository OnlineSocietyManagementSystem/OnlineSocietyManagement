package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.NoticeDto;

import jakarta.validation.Valid;

public interface NoticeService {

	ApiResponse addNotice(@Valid NoticeDto noticeDto);

}
