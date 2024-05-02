package com.chilbaeksan.mokaknyang.websocket.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
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

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());

        //세션에 참여하는 클라이언트의 memberId와 partyId를 얻어와서 저장
        if(CLIENT_PARTY.containsKey(memberIdAndPartyId[1])){
            List<Integer> list = CLIENT_PARTY.get(memberIdAndPartyId[1]);
            list.add(memberIdAndPartyId[0]);
            CLIENT_PARTY.put(memberIdAndPartyId[1], list);
        }
        else{
            List<Integer> list = new ArrayList<>();
            list.add(memberIdAndPartyId[0]);
            CLIENT_PARTY.put(memberIdAndPartyId[1], list);
        }
        //현재 참여하는 클라이언트 상태를 offline으로 설정
        CLIENT_STATUS.put(memberIdAndPartyId[0], "offline");
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

            Integer[] memberIdAndPartyId = extractMemberIdAndPartyId(session.getUri());
            log.info("memberId:"+memberIdAndPartyId[0]+", partyId:"+memberIdAndPartyId[1]);
            CLIENT_STATUS.put(memberIdAndPartyId[0], "online");

            Set<Integer> status = CLIENT_STATUS.keySet();
            for(int key : status){
                log.info("client_status:"+CLIENT_STATUS.get(key));
            }
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
}
