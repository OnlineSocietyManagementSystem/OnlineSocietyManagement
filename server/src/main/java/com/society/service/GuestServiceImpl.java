package com.society.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.GateEntryDao;
import com.society.daos.GuestDao;
import com.society.daos.UserDao;
import com.society.dtos.ApiResponse;
import com.society.dtos.GuestDto;
import com.society.dtos.GuestVerificationRequestDTO;
import com.society.pojos.GateEntry;
import com.society.pojos.Guest;
import com.society.pojos.User;
@Service
@Transactional
public class GuestServiceImpl implements GuestService{
	
	   @Autowired
	    private GuestDao guestDao;

	    @Autowired
	    private UserDao userDao;

	    @Autowired
	    private GateEntryDao gateEntryDao;
	    
	    @Autowired
	    private TwilioService twilioService;

	    @Autowired
		private ModelMapper mapper;

	@Override
	public String requestGuestApproval(GuestVerificationRequestDTO request) {
		
		Optional<User> userOpt = userDao.findById(request.getUserId());
        Optional<Guest> guestOpt = guestDao.findById(request.getGuestId());
        
        if (userOpt.isPresent() && guestOpt.isPresent()) {
            User user = userOpt.get();
            Guest guest = guestOpt.get();
            
         // Save entry request
            GateEntry gateEntry = new GateEntry();
            gateEntry.setGuest(guest);
            gateEntry.setUser(user);
           
            gateEntry.setApproved(false);
            gateEntryDao.save(gateEntry);
            
            // Logic to send notification to the member (e.g., SMS, email, or app notification)
            // Here, we simulate by returning a message
            String smsMessage = "Hello " + user.getFirstName() +user.getLastName() + ", your guest " + guest.getName() +
                    " has arrived at the gate. Please confirm their entry.";
           twilioService.sendSms(user.getPhone(), smsMessage);
            
            return "Notification sent to " + user.getFirstName() +user.getLastName()+ " for guest " + guest.getName();

        }

        return "Guest or User not found!";
	}
	
	
	 public String approveGuestEntry(Long entryId, boolean isApproved) {
	        Optional<GateEntry> gateEntryOpt = gateEntryDao.findById(entryId);

	        if (gateEntryOpt.isPresent()) {
	            GateEntry gateEntry = gateEntryOpt.get();
	            gateEntry.setApproved(isApproved);
	            gateEntryDao.save(gateEntry);
	            return isApproved ? "Guest entry approved" : "Guest entry denied";
	        }
	        return "Gate entry not found!";
	 }

	@Override
	public ApiResponse addGuest(GuestDto guestDTO,String email) {
		
		Optional<User> optionalUser = userDao.findByEmail(email);

		 if (!optionalUser.isPresent()) {
		        return new ApiResponse("Member not found!");
		    }
		 User user= optionalUser.get();
		 Guest guest =mapper.map(guestDTO, Guest.class);
		 guest.setUser(user);
		   
		 guestDao.save(guest);
			return new ApiResponse("Guest added successfully");
	}

}
