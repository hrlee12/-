package com.chilbaeksan.mokaknyang.websocket.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketTimerOperationRequest {
    private String memberLoginId;
    private LocalDateTime serverTime;
}
