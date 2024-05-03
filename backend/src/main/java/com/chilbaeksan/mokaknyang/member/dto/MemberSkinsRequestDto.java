package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class MemberSkinsRequestDto {
    @Builder.Default
    private Integer pageNum=1;
    @Builder.Default
    private Integer pageSize=10;
}
