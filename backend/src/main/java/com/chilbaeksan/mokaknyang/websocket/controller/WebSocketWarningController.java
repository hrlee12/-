package com.chilbaeksan.mokaknyang.websocket.controller;

import com.chilbaeksan.mokaknyang.websocket.dto.request.WebSocketMemberListRequest;
import com.chilbaeksan.mokaknyang.websocket.dto.response.WebSocketMemberWarningListResponse;
import com.chilbaeksan.mokaknyang.websocket.dto.response.WebSocketMemberWarningResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketWarningController {
    private final SimpMessageSendingOperations messagingTemplate;

    @MessageMapping("/warning/{partyId}")
    public void warningAlarm(@DestinationVariable("partyId") Integer partyId, WebSocketMemberListRequest webSocketMemberListRequest){
        //TODO: 해당 파티 소켓에 참여하고 있는 "online"상태의 사용자들의 정보(memberId, currentProcess, currentUrl, partyPurpose)를 받아 AI 서버에 요청
        //추후 승윤이가 ai 쪽 구현하면 구현할 예정
        //RestTemplate이나 WebClient 사용 (아마 WebClient가 비동기니까 더 좋을 듯?)

        //ai 서버에서 목표와 다른 행동을 하는 멤버에 대해서 response data 보내줌
        //memberId만 보내주면 될 듯

        //해당 파티에 참여(구독)하고 있는 사용자들에게 목표와 다른 행동을 하는 멤버 정보를 보내줌
        WebSocketMemberWarningResponse webSocketMemberWarningResponse =
                WebSocketMemberWarningResponse.builder()
                        .memberId(1)
                        .build();

        List<WebSocketMemberWarningResponse> webSocketMemberWarningResponseList = new ArrayList<>();
        webSocketMemberWarningResponseList.add(webSocketMemberWarningResponse);

        WebSocketMemberWarningListResponse webSocketMemberWarningListResponse =
                WebSocketMemberWarningListResponse.builder()
                        .memberWarningList(webSocketMemberWarningResponseList)
                        .build();

        messagingTemplate.convertAndSend("/sub/warning/" + partyId, webSocketMemberWarningListResponse);
    }
}
