package com.society.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.society.pojos.GuestNotification;
import com.society.pojos.NotificationStatus;

public interface GuestNotificationDao extends JpaRepository<GuestNotification, Long> {

	List<GuestNotification> findByMemberIdAndStatus(Long memberId, NotificationStatus status);
	
	Optional<GuestNotification> findById(Long notificationId);
}
