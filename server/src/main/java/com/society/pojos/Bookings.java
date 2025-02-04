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
    private BookingStatus status;
    
    @Column()
    private LocalDate bookingDate;
    
    @Column(name="start_time")
    private LocalTime startTime;
    
    @Column(name="end_time")
    private LocalTime endTime;
    
    @Column(length=50)
    private String purpose;
    
    @Column(length=255)
    private String comments; // Optional field for additional notes

    @ManyToOne
    @JoinColumn(name = "resource_id")
    private Resources resource;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    

}

