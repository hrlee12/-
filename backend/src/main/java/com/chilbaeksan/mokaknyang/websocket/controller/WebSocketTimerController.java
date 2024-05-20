package com.chilbaeksan.mokaknyang.websocket.controller;

import com.chilbaeksan.mokaknyang.websocket.dto.response.WebSocketTimerOperationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketTimerController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/timer/{partyId}")
    public void operateTimer(@DestinationVariable("partyId") Integer partyId){
        WebSocketTimerOperationResponse response = WebSocketTimerOperationResponse.builder()
                .serverTime(LocalDateTime.now())
                .build();

        messagingTemplate.convertAndSend("/sub/timer/" + partyId, response);
    }
}
