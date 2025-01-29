package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.MemberRegisterDto;

public interface AuthService {

	ApiResponse registerMemeber(MemberRegisterDto dto);

}
