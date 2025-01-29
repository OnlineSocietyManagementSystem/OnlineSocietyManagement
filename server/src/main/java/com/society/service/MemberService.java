package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.UserRegisterDto;

public interface MemberService {

	ApiResponse registerMemeber(UserRegisterDto dto);

}
