package com.chilbaeksan.mokaknyang.party.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyRegist {
    private String partyName;
    private String partyInviteMessage;
    private Byte partyParticipateNumber;
    private List<PartyMember> partyMembers;
}
