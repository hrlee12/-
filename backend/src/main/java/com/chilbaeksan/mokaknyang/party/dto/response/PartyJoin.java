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
public class PartyJoin {
    private Integer partyId;
    private String partyGoal;
    private Integer currentNum;
    private Integer maxNum;
    private String lastChatter;
    private String lastChatContent;
    private LocalDateTime lastSendChatTime;
}
