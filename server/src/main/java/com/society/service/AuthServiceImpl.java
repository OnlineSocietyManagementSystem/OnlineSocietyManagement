package com.society.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exception.ApiException;
import com.society.daos.AuthDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.MemberRegisterDto;
import com.society.pojos.Member;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

	@Autowired
	private AuthDao memberDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public ApiResponse registerMemeber(MemberRegisterDto dto) {
		if(memberDao.existsByEmail(dto.getEmail()))
			throw new ApiException("User email already exists!!!");
		
		Member memberEntity = modelMapper.map(dto, Member.class);
		memberEntity.setPassword(passwordEncoder.encode(memberEntity.getPassword()));
		Member savedMember= memberDao.save(memberEntity);
		return new ApiResponse(dto.getRole()+" "+"registered with ID " + savedMember.getId());
		
	}
}
