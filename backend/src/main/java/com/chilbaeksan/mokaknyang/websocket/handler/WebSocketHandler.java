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
    //key가 1이고 value에 2,3이 들어가있다면 현재 partyId 1에 멤버 2,3이 웹소켓에 접속해있다는 의미
    private static ConcurrentHashMap<Integer, List<Integer>> CLIENT_PARTY
            = new ConcurrentHashMap<>();

    //key : memberId
    //value : online || offline
    private static ConcurrentHashMap<Integer, String> CLIENT_STATUS
            = new ConcurrentHashMap<>();

    //key : memberId
    //value : time
    //마지막에 "pong"을 보낸 시간을 저장
    private static ConcurrentHashMap<Integer, Instant> LAST_PONG_TIME
            = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
        int memberId = memberIdAndPartyId[0];
        int partyId = memberIdAndPartyId[1];

        if(CLIENT_PARTY.containsKey(partyId)){
            List<Integer> list = CLIENT_PARTY.get(partyId);

            if(!list.contains(memberId))
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

        sendLoginPartyMemberStatus(session);
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
        listMemberId.remove(Integer.valueOf(memberId));

        if(listMemberId.isEmpty())
            CLIENT_PARTY.remove(partyId);
        else
            CLIENT_PARTY.put(partyId, listMemberId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        if(message.getPayload().equalsIgnoreCase("pong")){
            log.info("Received pong:{}", session.getId());

            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
            int memberId = memberIdAndPartyId[0];

            //"pong" 메시지를 받으면 "online" 상태로 변경
            CLIENT_STATUS.put(memberId, "online");
            //"pong" 메시지를 받은 마지막 시간을 갱신해준다
            LAST_PONG_TIME.put(memberId, Instant.now());
        }
    }

    //5초에 웹소켓에 참여하고 있는 사용자에게 "ping"을 보냄
    //클라이언트는 접속해있으면 바로 "pong"을 보내야함
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

        sendPartyMemberStatus();
    }

    //uri에서 partyId와 memberId를 추출
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

    //웹 소켓에 참여하는 모든 사용자에게 파티에 속해있는 사용자의 상태를 보내줌
    private void sendPartyMemberStatus() {
        for(WebSocketSession webSocketSession : CLIENTS.values()){
            Map<Integer, String> partyMemberStatus = new HashMap<>();

            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(webSocketSession.getUri());
            int partyId = memberIdAndPartyId[1];

            List<Integer> list = CLIENT_PARTY.get(partyId);

            if(list == null || list.isEmpty())
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
                log.error("Error converting party member status to JSON: {}", e.getMessage());
                return;
            }

            try {
                webSocketSession.sendMessage(new TextMessage(jsonData));
            } catch (IOException e) {
                log.error("Error sending party member status to client {}: {}", webSocketSession.getId(), e.getMessage());
            }
        }
    }

    //로그인 시 해당 파티에 참여하고 있는 사용자들의 정보를 보여준다
    public void sendLoginPartyMemberStatus(WebSocketSession webSocketSession){
        List<Integer> loginPartyMemberList = new ArrayList<>();

        Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(webSocketSession.getUri());
        int partyId = memberIdAndPartyId[1];

        List<Integer> list = CLIENT_PARTY.get(partyId);

        if(list == null || list.isEmpty())
            return;

        for(int listMemberId : list){
            loginPartyMemberList.add(listMemberId);
        }

        String jsonData;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            jsonData = objectMapper.writeValueAsString(loginPartyMemberList);
        } catch (JsonProcessingException e) {
            log.error("Error converting party member status to JSON: {}", e.getMessage());
            return;
        }

        try {
            webSocketSession.sendMessage(new TextMessage(jsonData));
        } catch (IOException e) {
            log.error("Error sending party member status to client {}: {}", webSocketSession.getId(), e.getMessage());
        }
    }

    public void printLog(){
        log.info("여기서부터 CLIENTS 정보");
        Set<String> set1 = CLIENTS.keySet();
        for(String key : set1){
            log.info("session id:"+key+", session:"+CLIENTS.get(key));
        }

        log.info("여기서부터 CLIENT_PARTY 정보");
        Set<Integer> set2 = CLIENT_PARTY.keySet();
        for(int partyId : set2){
            List<Integer> list = CLIENT_PARTY.get(partyId);
            log.info("partyId:"+partyId+", members:"+list.toString());
        }

        log.info("여기서부터 LAST_PONG_TIME 정보");
        Set<Integer> set3 = LAST_PONG_TIME.keySet();
        for(int memberId : set3){
            log.info("memberId:"+memberId+", last pong time:"+LAST_PONG_TIME.get(memberId));
        }

        log.info("여기서부터 CLIENT_STATUS 정보");
        Set<Integer> set4 = CLIENT_STATUS.keySet();
        for(int memberId : set4){
            log.info("memberId:"+memberId+", status:"+CLIENT_STATUS.get(memberId));
        }
    }
}