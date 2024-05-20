package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class InviteParty {
    private Integer memberId;
    private String memberName;
    private Integer partyId;
    private String partyName;
    private LocalDateTime expireTime;
}
