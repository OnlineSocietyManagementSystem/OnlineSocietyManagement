package com.society.dtos;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GuestNotificationDto {
    private Long userId;
    private String guestName;
    private LocalDateTime arrivalTime;
    private String status;
    private Long securityGuardId;
}
