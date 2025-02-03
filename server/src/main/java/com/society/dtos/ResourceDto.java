package com.society.dtos;

import java.time.LocalTime;

import com.society.pojos.Society;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceDto extends BaseDto {

    private String resourceType;

    private String description;

    private String name;
    
    private boolean availability;
    
    private int capacity;
       
    private double bookingFee;

    private LocalTime openHours;

    private String amenities;

    private Society society;
}
