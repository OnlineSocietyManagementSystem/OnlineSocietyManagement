package com.society.pojos;

import java.time.LocalTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="resources")
public class Resources extends BaseEntity{

    @Column(length=25)
    private String resourceType;

    @Column(length=50)
    private String description;
    
    @Enumerated(EnumType.STRING)
    private AvailabilityStatus status = AvailabilityStatus.AVAILABLE; 
    
    private int capacity;
    
    private double bookingFee;
      
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "society_id")
    private Society society;
}
