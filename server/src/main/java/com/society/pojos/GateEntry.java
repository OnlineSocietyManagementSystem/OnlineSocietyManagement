package com.society.pojos;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gate_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GateEntry extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "guest_id")
    private Guest guest;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean isApproved;
}

