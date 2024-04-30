package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartySettingInfo {
    private String partyGoal;
    private String partyName;
    private Integer partyMaxNumber;
    private Integer partyParticipateNumber;
    private List<PartySettingMember> partyMembers;
}
