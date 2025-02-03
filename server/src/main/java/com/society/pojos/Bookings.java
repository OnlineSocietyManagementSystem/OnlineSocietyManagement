package com.society.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="bookings")
public class Bookings extends BaseEntity {
    
    @Enumerated(EnumType.STRING)
    @Column(length=15)
    private BookingStatus status; // Enum for booking status
    
    @Column(nullable=false)
    private LocalDate bookingDate;
    
    @Column(nullable=false)
    private LocalTime startTime;
    
    @Column(nullable=false)
    private LocalTime endTime;
    
    @Column(length=50)
    private String purpose;

    @ManyToOne
    @JoinColumn(name = "resource_id", nullable = false)
    private Resources resource;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(length=255)
    private String comments; // Optional field for additional notes

}

