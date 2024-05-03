package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class MemberSkinsResponseDto {
    private List<MemberSkinsResponseDto.CatDto> cats;
    @Builder
    public static class CatDto{
        private Integer catId;
        private String catAssetUrl;
        private Short catAchieveLevel;
    }
}
