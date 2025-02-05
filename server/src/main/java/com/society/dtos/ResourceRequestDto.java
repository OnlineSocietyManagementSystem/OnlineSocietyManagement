package com.society.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResourceRequestDto extends BaseDto
{

    private String resourceType;

    private String description;

    private String name;
    
    private int capacity;
       
    private double bookingFee;

    private String amenities;

//    private Long societyId;
}
