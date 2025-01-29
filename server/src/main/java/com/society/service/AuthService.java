package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.UserRegisterDto;

public interface AuthService {

	ApiResponse registerMemeber(UserRegisterDto dto);

}
