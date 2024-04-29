package com.chilbaeksan.mokaknyang.party.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PartyDelete {
    private Integer partyId;
}
