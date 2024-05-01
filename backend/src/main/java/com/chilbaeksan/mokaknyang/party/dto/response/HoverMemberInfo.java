package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HoverMemberInfo {
    private String name;
    private String title;
    private Short level;
    private Integer exp;
    private Integer hitNumber;
    private Integer behitNumber;
}
