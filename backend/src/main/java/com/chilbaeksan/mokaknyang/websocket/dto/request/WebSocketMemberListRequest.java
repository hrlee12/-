package com.chilbaeksan.mokaknyang.websocket.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketMemberListRequest {
    private List<WebSocketMemberRequest> memberList;
}
