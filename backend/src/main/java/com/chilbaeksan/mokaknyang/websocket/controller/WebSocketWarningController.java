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
    private final WebClient webClient = WebClient.builder().baseUrl("https://mogaknyang-ai.duckdns.org").build();

    @MessageMapping("/warning/{partyId}")
    public void warningAlarm(@DestinationVariable("partyId") Integer partyId, WebSocketMemberWarningRequest webSocketMemberWarningRequest){
        //해당 파티에 참여(구독)하고 있는 사용자가 목표와 다른 행동을 한다면
        //"YES" 부합한 행동을 한다면 아니면 "NO"를 보내준다
        WebSocketMemberWarningResponse webSocketMemberWarningResponse =
                webClient
                    .post()
                    .uri("/topprocess")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(webSocketMemberWarningRequest))
                    .retrieve()
                    .bodyToMono(WebSocketMemberWarningResponse.class)
                    .block();

        messagingTemplate.convertAndSend("/sub/warning/" + partyId, webSocketMemberWarningResponse);
    }
}
