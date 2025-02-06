package com.society.dtos;

import com.society.pojos.AvailabilityStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceResponseDto extends BaseDto {

    private String resourceType;

    private String description;
    
    private AvailabilityStatus status;
    
    private int capacity;
    
    private double bookingFee;
    
}
