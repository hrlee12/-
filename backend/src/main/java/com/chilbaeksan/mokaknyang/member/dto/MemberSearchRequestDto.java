package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSearchRequestDto {
    private String userId; // 회원이 사용하는 아이디
}
