package com.society.service;

import com.society.dtos.ApiResponse;
import com.society.dtos.ProfileDto;
import com.society.dtos.UserRegisterDto;

public interface UserService {

	ApiResponse registerMemeber(UserRegisterDto dto);

	ApiResponse updateProfile(ProfileDto dto,String email);

	ProfileDto getProfile(String email);

}
