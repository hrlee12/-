package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class InviteGroupList {
    private List<InviteGroup> inviteList;
}
