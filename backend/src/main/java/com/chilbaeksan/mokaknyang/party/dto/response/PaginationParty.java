package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaginationParty {
    private Integer partyId;
    private String purpose;
    private Byte participateNumber;
    private Byte maxNumber;
}
