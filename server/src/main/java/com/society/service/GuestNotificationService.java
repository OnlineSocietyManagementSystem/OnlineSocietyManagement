package com.society.service;

import com.society.dtos.GuestNotificationDto;

import java.util.List;

public interface GuestNotificationService {
    List<GuestNotificationDto> getPendingNotifications(Long memberId);
    void approveGuest(Long notificationId);
    void rejectGuest(Long notificationId);
	String notifyGuestArrival(GuestNotificationDto dto);
	String getGuestStatusForGuard(Long notificationId);
}
