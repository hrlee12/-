package com.chilbaeksan.mokaknyang.party.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyUpdate {
    private String partyGoal;
    private String partyName;
    private Integer partyManagerId;
}
