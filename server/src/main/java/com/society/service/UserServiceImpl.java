package com.society.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exception.ApiException;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.ProfileDto;
import com.society.dtos.UserRegisterDto;
import com.society.pojos.User;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public ApiResponse registerMemeber(UserRegisterDto dto) {
		if(userDao.existsByEmail(dto.getEmail()))
			throw new ApiException("User email already exists!!!");
		
		User memberEntity = modelMapper.map(dto, User.class);
		memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
		User savedMember= userDao.save(memberEntity);
		return new ApiResponse(dto.getRole()+" "+"registered with ID " + savedMember.getId());
		
	}

	@Override
	public ApiResponse updateProfile(ProfileDto dto,String email) 
	{
	        Optional<User> optionalUser = userDao.findByEmail(email);
	        
	        if (optionalUser.isEmpty()) {
	            return new ApiResponse("User not found");
	        }

	        User user = optionalUser.get();
	        
	        // Updating profile fields
	        user.setBuilding(dto.getBuilding());
	        user.setFlatNo(dto.getFlatNo());
	        user.setFloor(dto.getFloor());
	        user.setAddhar(dto.getAddhar());
	        user.setPhone(dto.getPhone());
	        user.setFamilyCount(dto.getFamilyCount());
	        userDao.save(user); // Update user in database
	        return new ApiResponse("Profile updated successfully");
	    }

	@Override
    public ProfileDto getProfile(String email) {
        Optional<User> optionalUser = userDao.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new ApiException("User not found");
        }

        User user = optionalUser.get();
        
        // Convert User to ProfileDto using ModelMapper
        return modelMapper.map(user, ProfileDto.class);
    }
		
	}

