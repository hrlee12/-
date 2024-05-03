package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberModifyRequestDto {
    private String memberCatName;
    private String memberGoal;
    private Short titleId;
}
