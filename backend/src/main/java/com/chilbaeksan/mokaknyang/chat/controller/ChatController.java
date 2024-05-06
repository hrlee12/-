package com.chilbaeksan.mokaknyang.chat.controller;

import com.chilbaeksan.mokaknyang.chat.dto.ChatListRequestDto;
import com.chilbaeksan.mokaknyang.chat.dto.ChatListResponseDto;
import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.chilbaeksan.mokaknyang.chat.service.ChatService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/{partyId}")
    @SendTo("/sub/channel/{partyId}")
    public void sendMessage(
            @DestinationVariable("partyId") Integer partyId,
            ChatSendRequestDto requestDto,
            HttpServletRequest request
    ) {
        // 채팅 메시지를 전달하는 로직
        // '채팅' 토픽 구독자에게 전달

        // MongoDB에 채팅 메시지 저장
        chatService.saveMessage(requestDto, partyId);
    }

    @GetMapping("/{partyId}")
    @ResponseBody
    public ResponseEntity<?> getChatList(
            @PathVariable(value="partyId") Integer partyId,
            ChatListRequestDto requestDto,
            HttpServletRequest request
    ) {

        Pageable pageable = PageRequest.of(requestDto.getPageNum(), requestDto.getPageSize());
        // 채팅 메시지 MongoDB에서 조회하는 로직 수행
        List<ChatMessage> result = chatService.getPartyMessages(pageable, partyId);

        //각각 response dto 매핑 하기
        ChatListResponseDto responseDto = ChatListResponseDto.builder()
                .chatMessages(result.stream().map(
                        m -> ChatListResponseDto.MessageDto.builder()
                                .userId(m.getSenderId())
                                .userNickname(m.getSenderNickname())
                                .contents(m.getContents())
                                .sendTime(m.getSendTime())
                                .build()
                        ).toList())
                .build();

        return ResponseEntity.ok(responseDto);
    }
}
