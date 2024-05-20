package com.chilbaeksan.mokaknyang.websocket.controller;

import com.chilbaeksan.mokaknyang.websocket.dto.request.WebSocketDrawingRequest;
import com.chilbaeksan.mokaknyang.websocket.dto.response.WebSocketDrawingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketDrawingController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/drawing/{partyId}")
    public void drawObject(@DestinationVariable("partyId") Integer partyId, WebSocketDrawingRequest webSocketDrawingRequest){
        WebSocketDrawingResponse webSocketDrawingResponse =
                WebSocketDrawingResponse.builder()
                        .object(webSocketDrawingRequest.getObject())
                        .build();

        messagingTemplate.convertAndSend("/sub/drawing/"+partyId, webSocketDrawingResponse);
    }
}
