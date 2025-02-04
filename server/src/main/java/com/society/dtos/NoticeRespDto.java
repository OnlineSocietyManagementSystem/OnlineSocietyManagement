package com.society.dtos;

import java.time.LocalDate;

import com.society.pojos.Notices;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NoticeRespDto extends BaseDto{

	private String title;

	private String description;

}
