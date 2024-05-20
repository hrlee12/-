package com.chilbaeksan.mokaknyang.chat.Handler;

import com.chilbaeksan.mokaknyang.member.dto.MemberConstant;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class ChatHandler extends TextWebSocketHandler {
    private List<WebSocketSession> sessionList;

    private ChatHandler() {
        sessionList = new ArrayList<>();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        Member user = getUser(session);
        sessionList.add(session);
        log.info("채팅 접속 : {}", user.getLoginId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Member user = getUser(session);
        log.info("메세지전송 = {} : {}", user.getLoginId(), message.getPayload());
        for (WebSocketSession currentSession : sessionList) {
            currentSession.sendMessage(new TextMessage(user.getLoginId() + " : " + message.getPayload()));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        Member user = getUser(session);
        sessionList.remove(session);
        log.info("연결 끊김 : {}", user.getLoginId());
    }

    private Member getUser(WebSocketSession session) {
        return (Member) session.getAttributes().get(MemberConstant.HEADER_USER_KEY.getKey());
    }
}