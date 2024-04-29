package com.chilbaeksan.mokaknyang.party.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class InviteGroup {
    private Integer memberId;
    private String memberName;
    private Integer groupId;
    private LocalDateTime expireTime;
}
