package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartySettingInfo {
    private String partyGoal;
    private String partyName;
    private Byte partyMaxNumber;
    private Byte partyParticipateNumber;
    private Integer partyManagerId;
    private String partyManagerName;
    private List<PartySettingMember> partyMembers;
}
