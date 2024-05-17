package com.chilbaeksan.mokaknyang.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberFindCatResponse {
    private Integer memberId;
    private Integer catId;
}
