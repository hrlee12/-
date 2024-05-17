package com.chilbaeksan.mokaknyang.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberFindCatListResponse {
    private List<MemberFindCatResponse> catIdList;
}
