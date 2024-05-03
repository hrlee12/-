package com.chilbaeksan.mokaknyang.websocket.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class WebSocketHandler extends TextWebSocketHandler{
    //key : sessionId
    //value : session 객체
    private static ConcurrentHashMap<String, WebSocketSession> CLIENTS
            = new ConcurrentHashMap<>();

    //key : partyId
    //value : memberId
    private static ConcurrentHashMap<Integer, List<Integer>> CLIENT_PARTY
            = new ConcurrentHashMap<>();

    //key : memberId
    //value : online || offline
    private static ConcurrentHashMap<Integer, String> CLIENT_STATUS
            = new ConcurrentHashMap<>();

    //key : memberId
    //value : time
    private static ConcurrentHashMap<Integer, Instant> LAST_PONG_TIME
            = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
        int memberId = memberIdAndPartyId[0];
        int partyId = memberIdAndPartyId[1];

        if(CLIENT_PARTY.containsKey(partyId)){
            List<Integer> list = CLIENT_PARTY.get(partyId);
            list.add(memberId);
            CLIENT_PARTY.put(partyId, list);
        }
        else{
            List<Integer> list = new ArrayList<>();
            list.add(memberId);
            CLIENT_PARTY.put(partyId, list);
        }

        CLIENT_STATUS.put(memberId, "online");
        CLIENTS.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
        int memberId = memberIdAndPartyId[0];
        int partyId = memberIdAndPartyId[1];

        CLIENTS.remove(session.getId());
        CLIENT_STATUS.remove(memberId);
        LAST_PONG_TIME.remove(memberId);

        List<Integer> listMemberId = CLIENT_PARTY.get(partyId);
        listMemberId.remove(memberId);
        CLIENT_PARTY.put(partyId, listMemberId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        if(message.getPayload().equalsIgnoreCase("pong")){
            log.info("Received pong:{}", session.getId());

            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
            int memberId = memberIdAndPartyId[0];
            CLIENT_STATUS.put(memberId, "online");

            LAST_PONG_TIME.put(memberId, Instant.now());
        }
    }

    @Scheduled(fixedRate = 5000)
    public void expire(){
        CLIENTS.values().forEach(webSocketSession -> {
            try{
                webSocketSession.sendMessage(new TextMessage("ping"));
            } catch(IOException e){
                e.printStackTrace();
            }
        });
    }

    @Scheduled(fixedRate = 10000)
    public void checkClientStatus(){
        Instant now = Instant.now();

        for(WebSocketSession webSocketSession : CLIENTS.values()){
            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(webSocketSession.getUri());
            int memberId = memberIdAndPartyId[0];

            if(LAST_PONG_TIME.get(memberId) == null)
                CLIENT_STATUS.put(memberId, "offline");

            else{
                Instant lastPongTime = LAST_PONG_TIME.get(memberId);
                Duration durationSinceLastPong = Duration.between(lastPongTime, now);

                if(durationSinceLastPong.getSeconds() > 15){
                    //오프라인으로 처리
                    CLIENT_STATUS.put(memberId, "offline");
                }
            }
        }

        sendGroupMemberStatus();
    }

    private Integer[] extractMemberIdAndPartyId(URI uri){
        Integer[] memberIdAndPartyId = new Integer[2];

        String query = uri.getQuery();
        String[] queryParams = query.split("&");

        for(String param : queryParams){
            String[] keyValue = param.split("=");

            if(keyValue.length == 2){
                if(keyValue[0].equalsIgnoreCase("memberId")){
                    memberIdAndPartyId[0] = Integer.parseInt(keyValue[1]);
                }
                else if(keyValue[0].equalsIgnoreCase("partyId")){
                    memberIdAndPartyId[1] = Integer.parseInt(keyValue[1]);
                }
            }
        }

        return memberIdAndPartyId;
    }

    private void sendGroupMemberStatus() {
        for(WebSocketSession webSocketSession : CLIENTS.values()){
            Map<Integer, String> partyMemberStatus = new HashMap<>();

            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(webSocketSession.getUri());
            int partyId = memberIdAndPartyId[1];

            List<Integer> list = CLIENT_PARTY.get(partyId);

            if(list == null)
                return;

            for(int listMemberId : list){
                String status = CLIENT_STATUS.get(listMemberId);
                partyMemberStatus.put(listMemberId, status);
            }

            String jsonData;
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                jsonData = objectMapper.writeValueAsString(partyMemberStatus);
            } catch (JsonProcessingException e) {
                log.error("Error converting group member status to JSON: {}", e.getMessage());
                return;
            }

            try {
                webSocketSession.sendMessage(new TextMessage(jsonData));
            } catch (IOException e) {
                log.error("Error sending group member status to client {}: {}", webSocketSession.getId(), e.getMessage());
            }
        }
    }
}
