package com.society.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exception.ApiException;
import com.society.daos.MemberDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.MemberRegisterDto;
import com.society.pojos.Member;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberDao memberDao;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Override
	public ApiResponse registerMemeber(MemberRegisterDto dto) {
		if(memberDao.existsByEmail(dto.getEmail()))
			throw new ApiException("User email already exists!!!");
		
		Member memberEntity = modelMapper.map(dto, Member.class);
		Member savedMember= memberDao.save(memberEntity);
		return new ApiResponse("User registered with ID " + savedMember.getId());
		
	}

}
