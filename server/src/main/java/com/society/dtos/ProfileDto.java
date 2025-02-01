package com.society.dtos;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProfileDto extends BaseDto {
	
    private String building;	
	private int flatNo;
	private int floor;
    private String  addhar;
	private String phone;
	private int familyCount;

}
