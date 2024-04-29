package com.chilbaeksan.mokaknyang.party.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PartyRegist {
    private String partyName;
    private String partyInviteMessage;
    private Byte partyMaxNumber;
    private Byte partyParticipateNumber;
}
