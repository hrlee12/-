package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRegisterRequestDto {
    private String memberCatName;
    private String memberGoal;
}
