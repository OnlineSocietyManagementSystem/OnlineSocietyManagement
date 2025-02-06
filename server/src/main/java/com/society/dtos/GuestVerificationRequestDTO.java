package com.society.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GuestVerificationRequestDTO {

	private Long guestId;
    private Long userId;
}
