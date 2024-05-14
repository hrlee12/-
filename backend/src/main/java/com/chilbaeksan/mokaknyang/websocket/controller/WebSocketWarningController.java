package com.chilbaeksan.mokaknyang.websocket.controller;

import com.chilbaeksan.mokaknyang.websocket.dto.request.WebSocketMemberWarningRequest;
import com.chilbaeksan.mokaknyang.websocket.dto.response.WebSocketMemberWarningResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketWarningController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/warning/{partyId}")
    public void warningAlarm(@DestinationVariable("partyId") Integer partyId, WebSocketMemberWarningRequest webSocketMemberWarningRequest){
        WebSocketMemberWarningResponse webSocketMemberWarningResponse =
                WebSocketMemberWarningResponse.builder()
                                .memberId(webSocketMemberWarningRequest.getMemberId())
                                .result(webSocketMemberWarningRequest.getResult())
                                .build();

        messagingTemplate.convertAndSend("/sub/warning/" + partyId, webSocketMemberWarningResponse);
    }
}
