package com.chilbaeksan.mokaknyang.websocket.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WebSocketTimerOperationResponse {
    private LocalDateTime serverTime;
}
