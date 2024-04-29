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
    private String memberCatColor;
    private Short titleId;
    private Integer catId;
}
