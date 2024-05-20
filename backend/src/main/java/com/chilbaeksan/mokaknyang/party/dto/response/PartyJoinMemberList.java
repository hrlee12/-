package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartyJoinMemberList {
    private Integer managerId;
    private List<PartyJoinMember> members;
}
