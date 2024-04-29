package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class InvitePartyList {
    private List<InviteParty> inviteList;
}
