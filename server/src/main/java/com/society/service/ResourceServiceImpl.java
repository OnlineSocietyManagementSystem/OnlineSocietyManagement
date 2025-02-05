package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.custom_exceptions.ResourceNotFoundException;
import com.society.daos.SocietyDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.ResourceRequestDto;
import com.society.dtos.ResourceResponseDto;
import com.society.pojos.Resources;
import com.society.pojos.Society;
import com.society.pojos.User;

@Service
@Transactional
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	private ResourceDao resourceDao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private UserDao userDao;

	@Autowired
	private SocietyDao societyDao;

	@Override
	public ApiResponse addResource(ResourceRequestDto dto, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);
//		Society society = societyDao.findById(dto.getSocietyId())
//				.orElseThrow(() -> new ResourceNotFoundException("no society present with given id"));

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Member not found!");
		}

		User user = optionalUser.get();

		Resources resource = mapper.map(dto, Resources.class);
		resource.setUser(user);
//		resource.setSociety(society);

		resourceDao.save(resource);

		return new ApiResponse("Resource added successfully");

	}

	@Override
	public List<ResourceResponseDto> getAllResources() {

		return resourceDao.findAll().stream().map(resource -> mapper.map(resource, ResourceResponseDto.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse deleteResource(Long resourceId, String email) {
		Optional<User> optionalUser = userDao.findByEmail(email);

		if (!optionalUser.isPresent()) {
			return new ApiResponse("Unauthorized access!");
		}

		Optional<Resources> optionalResource = resourceDao.findById(resourceId);

		if (!optionalResource.isPresent()) {
			return new ApiResponse("Resource not found!");
		}

		resourceDao.delete(optionalResource.get());
		return new ApiResponse("Resource deleted sucessfully");

	}

}
