package com.chilbaeksan.mokaknyang.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketMemberWarningResponse {
    private Integer memberId;
}
