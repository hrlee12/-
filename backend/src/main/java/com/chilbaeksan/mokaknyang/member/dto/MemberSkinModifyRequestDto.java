package com.chilbaeksan.mokaknyang.member.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@Getter
public class MemberSkinModifyRequestDto {
    @Builder.Default
    private Integer catId = 1;
}
