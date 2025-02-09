package com.society.controllers;

import com.society.dtos.GuestNotificationDto;
import com.society.service.GuestNotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class GuestNotificationController {

	@Autowired
    private GuestNotificationService guestNotificationService;

    
    @PostMapping("/notify-member")
    public String notifyGuest(@RequestBody GuestNotificationDto dto) {
        return guestNotificationService.notifyGuestArrival(dto);
    }

    @GetMapping("/pending/{memberId}")
    public List<GuestNotificationDto> getPendingNotifications(@PathVariable Long memberId) {
        return guestNotificationService.getPendingNotifications(memberId);
    }

    @PutMapping("/approve/{notificationId}")
    public String approveGuest(@PathVariable Long notificationId) {
        guestNotificationService.approveGuest(notificationId);
        return "Guest approved!";
    }

    @PutMapping("/reject/{notificationId}")
    public String rejectGuest(@PathVariable Long notificationId) {
        guestNotificationService.rejectGuest(notificationId);
        return "Guest rejected!";
    }
    
    @GetMapping("/notify-guard")
    public String notifyGuard(@PathVariable Long notificationId) {
        guestNotificationService.notifyGuard(notificationId);
        return "Guest rejected!";
    }
    
}
