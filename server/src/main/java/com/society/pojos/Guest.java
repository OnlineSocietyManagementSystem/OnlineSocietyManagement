package com.society.pojos;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "guests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Guest extends BaseEntity{
    
	
    private String name;
    @Column(name="contact_no",length=10)
    private String contactNumber;
    @Column(name="entry_time")
    private LocalDateTime entryTime;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;  // Guest is visiting this member
}

