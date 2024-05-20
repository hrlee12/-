package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyJoinMember {
    private Integer memberId;
    private String name;
    private Integer catId;
}
