package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartySettingMember {
    private Integer memberId;
    private String memberCatName;
    private Integer catId;
    private LocalDateTime partyCreatedAt;
}
