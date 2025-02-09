package com.society.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.society.daos.GuestNotificationDao;
import com.society.daos.SecurityGuardDao;
import com.society.daos.UserDao;
import com.society.dtos.GuestNotificationDto;
import com.society.pojos.GuestNotification;
import com.society.pojos.NotificationStatus;
import com.society.pojos.SecurityGuard;
import com.society.pojos.User;

@Service
@Transactional
public class GuestNotificationServiceImpl implements GuestNotificationService {

	@Autowired
	private GuestNotificationDao guestNotificationDao;
	@Autowired
	private UserDao userDao;

	@Autowired
	private SecurityGuardDao securityGuardDao;

	@Autowired
	private TwilioService twilioService;

	@Override
	public List<GuestNotificationDto> getPendingNotifications(Long memberId) {
		return guestNotificationDao.findByMemberIdAndStatus(memberId, NotificationStatus.PENDING).stream()
				.map(n -> new GuestNotificationDto(n.getId(), n.getGuestName(), n.getArrivalTime(),
						n.getStatus().name(), n.getSecurityGuard().getId()))
				.collect(Collectors.toList());
	}

	@Override
	public void approveGuest(Long notificationId) {
		GuestNotification notification = guestNotificationDao.findById(notificationId)
				.orElseThrow(() -> new RuntimeException("Notification not found"));
		notification.setStatus(NotificationStatus.APPROVED);
		guestNotificationDao.save(notification);
		
	}

	@Override
	public void rejectGuest(Long notificationId) {
		GuestNotification notification = guestNotificationDao.findById(notificationId)
				.orElseThrow(() -> new RuntimeException("Notification not found"));
		notification.setStatus(NotificationStatus.REJECTED);
		guestNotificationDao.save(notification);
	}

	@Override
	public String notifyGuestArrival(GuestNotificationDto dto) {
		User member = userDao.findById(dto.getUserId()).orElseThrow(() -> new RuntimeException("Member not found"));

		SecurityGuard securityGuard = securityGuardDao.findById(dto.getSecurityGuardId())
				.orElseThrow(() -> new RuntimeException("Security Guard not found"));

		GuestNotification notification = new GuestNotification();
		notification.setMember(member);
		notification.setGuestName(dto.getGuestName());
		notification.setArrivalTime(LocalDateTime.now());
		notification.setStatus(NotificationStatus.PENDING);
		notification.setSecurityGuard(securityGuard);

		guestNotificationDao.save(notification);

		 String formattedPhoneNumber = "+91" + member.getPhone();
		// Logic to send notification to the member (e.g., SMS, email, or app
		// notification)
		// Here, we simulate by returning a message
		String smsMessage = "Hello " + member.getFirstName() + member.getLastName() + ", your guest "
				+ dto.getGuestName() + " has arrived at the gate. Please confirm their entry.";
		twilioService.sendSms(formattedPhoneNumber, smsMessage);
		
		return "Notification sent to " + member.getFirstName() +member.getLastName()+ " for guest " + dto.getGuestName();
	}
	

	@Override
	public String getGuestStatusForGuard(Long notificationId) {
	    GuestNotification notification = guestNotificationDao.findById(notificationId)
	            .orElseThrow(() -> new RuntimeException("Notification not found"));

	    return "Guest: " + notification.getGuestName() + 
	           ", Status: " + notification.getStatus().name();
	}



}
