package com.chilbaeksan.mokaknyang.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum MemberConstant {
    HEADER_USER_KEY("memberId")
    ;
    private final String key;
}
