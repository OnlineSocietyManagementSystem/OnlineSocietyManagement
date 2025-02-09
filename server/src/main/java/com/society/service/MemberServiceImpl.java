package com.society.service;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.society.daos.MemberDao;
import com.society.dtos.MemberRespDto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberServiceImpl implements MemberService {
       
	@Autowired
    private MemberDao memberDao;
	
	@Autowired
	private ModelMapper mapper;


   

	@Override
    public List<MemberRespDto> getAllMembers() {
        return memberDao.findAllMembers()  // Fetch only "MEMBER" roles
                .stream()
                .map(member -> mapper.map(member, MemberRespDto.class))
                .collect(Collectors.toList());
    }
}

