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
    
    @Column(length=50)
    private String name;
    
    private boolean availability;
    
    private int capacity;
    
    private double bookingFee;
    
    @Column(name="open_hours")
    private LocalTime openHours;
    
    @Column(length=255)
    private String amenities;
    
    @ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

    @ManyToOne
    @JoinColumn(name = "society_id",nullable = false)
    private Society society;
}
