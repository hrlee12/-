package com.chilbaeksan.mokaknyang.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketMemberWarningListResponse {
    private List<WebSocketMemberWarningResponse> memberWarningList;
}
