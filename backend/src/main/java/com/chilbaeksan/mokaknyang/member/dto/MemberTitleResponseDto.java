package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class MemberTitleResponseDto {
    private List<MemberTitleResponseDto.TitleDto> titles;

    @Builder
    public static class TitleDto{
        private Short titleId;
        private String titleContent;
        private Short titleAchieveLevel;
    }
}
