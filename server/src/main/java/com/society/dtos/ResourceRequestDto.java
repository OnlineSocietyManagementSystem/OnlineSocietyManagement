package com.society.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceRequestDto extends BaseDto
{

    private String resourceType;

    private String description;
    
    private int capacity;
       
    private double bookingFee;

}
