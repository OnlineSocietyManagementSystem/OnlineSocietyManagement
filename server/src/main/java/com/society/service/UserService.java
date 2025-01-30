package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.UserRegisterDto;

public interface UserService {

	ApiResponse registerMemeber(UserRegisterDto dto);

}
