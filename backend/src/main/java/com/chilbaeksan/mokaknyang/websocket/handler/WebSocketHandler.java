package com.chilbaeksan.mokaknyang.websocket.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class WebSocketHandler extends TextWebSocketHandler{
    private static final ConcurrentHashMap<String, WebSocketSession> CLIENTS
            = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        CLIENTS.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        CLIENTS.remove(session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        if(message.getPayload().equalsIgnoreCase("pong")){
            log.info("Received pong:{}", session.getId());
            log.debug("Received pong:{}", session.getId());
        }
    }

    @Scheduled(fixedRate = 1000)
    public void expire(){
        CLIENTS.values().forEach(webSocketSession -> {
            try{
                webSocketSession.sendMessage(new TextMessage("ping"));
            } catch(IOException e){
                e.printStackTrace();
            }
        });
    }
}
