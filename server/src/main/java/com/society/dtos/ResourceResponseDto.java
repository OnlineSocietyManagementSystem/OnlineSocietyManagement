package com.society.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceResponseDto extends BaseDto {

    private String resourceType;

    private String description;
    
    private boolean availability;
    
    private int capacity;
    
    private double bookingFee;
    
}
