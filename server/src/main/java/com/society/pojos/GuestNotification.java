package com.society.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "guest_notifications")
public class GuestNotification extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "member_id")
    private User member; // The member receiving the guest

    @Column(name = "guest_name", length = 50)
    private String guestName;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private NotificationStatus status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "security_guard_id")
    private SecurityGuard securityGuard;
}
