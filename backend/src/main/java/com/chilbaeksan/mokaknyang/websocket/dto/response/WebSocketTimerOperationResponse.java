package com.chilbaeksan.mokaknyang.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketTimerOperationResponse {
    private LocalDateTime serverTime;
}
