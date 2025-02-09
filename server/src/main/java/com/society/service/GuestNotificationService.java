package com.society.service;

import com.society.dtos.GuestNotificationDto;
import com.society.dtos.GuestNotificationResponseDto;

import java.util.List;

public interface GuestNotificationService {
    List<GuestNotificationDto> getPendingNotifications(Long memberId);

    void approveGuest(Long notificationId);

    void rejectGuest(Long notificationId);

    GuestNotificationResponseDto notifyGuestArrival(GuestNotificationDto dto);

    // String notifyGuard(Long notificationId);
    // List<GuestNotificationDto> getNotificationsForGuard(Long guardId);
    String getGuestStatusForGuard(Long notificationId);
}
