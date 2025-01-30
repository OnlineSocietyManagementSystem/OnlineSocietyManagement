package com.society.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.ComplaintDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.ComplaintDto;
import com.society.dtos.ComplaintResDto;
import com.society.pojos.ComplaintStatus;
import com.society.pojos.Complaints;
import com.society.pojos.User;

@Service
@Transactional
public class ComplaintServiceImpl implements ComplaintService {
	  @Autowired
	    private ComplaintDao complaintDao;

	    @Autowired
	    private UserDao userDao;

	    @Autowired
	    private ModelMapper modelMapper; // Inject ModelMapper
	    
	    //------------------add complaint API-------------------------------------

		@Override
		public ApiResponse addComplaint(ComplaintDto dto, String email) {
			 Optional<User> optionalUser = userDao.findByEmail(email);
		        if (!optionalUser.isPresent()) {
		            return new ApiResponse("User not found!");
		        }

		       User user = optionalUser.get();

		        // Convert DTO to Entity using ModelMapper
		        Complaints complaint= modelMapper.map(dto, Complaints.class);
		        
		        // Manually set properties that are not in DTO
		      
		        complaint.setStatus(ComplaintStatus.PENDING); // Automatically set status
		        complaint.setUser(user); // Set the user entity (foreign key)

		        // Save to the database
		        complaintDao.save(complaint);

		        return new ApiResponse("Complaint issued Successfully: " + email);
		    }	
	

		

		//-----------------------get all complaints API--------------------------------
		
		@Override
		public List<ComplaintResDto> getAllComplaints() {
		    List<Complaints> complaints = complaintDao.findAll();
		    return complaints.stream().map(ComplaintResDto::new).collect(Collectors.toList());
		}
		//-------------------get complaints by ID-------------------------------------
		@Override
		public Optional<ComplaintDto> getComplaintById(Long complaintId) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}
}


		
		
		
