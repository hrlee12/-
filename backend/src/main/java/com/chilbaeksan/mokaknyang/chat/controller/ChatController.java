package com.chilbaeksan.mokaknyang.chat.controller;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.chat.dto.ChatListRequestDto;
import com.chilbaeksan.mokaknyang.chat.dto.ChatListResponseDto;
import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.chilbaeksan.mokaknyang.chat.service.ChatService;
import com.chilbaeksan.mokaknyang.chat.service.RedisPublisher;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
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

@Slf4j
@Controller
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final JwtUtil jwtUtil;

    @MessageMapping("/{partyId}")
    public void sendMessage(
            @DestinationVariable("partyId") Integer partyId,
            ChatSendRequestDto requestDto
    ) {
        //TODO : userId 가져오는 로직
        Integer userId = 1;

        // 채팅 메시지를 전달하는 로직
        // '채팅' 토픽 구독자에게 전달
        chatService.publishMessage(requestDto, userId, partyId);

        // MongoDB에 채팅 메시지 저장
        chatService.saveMessage(requestDto, userId, partyId);
    }

    @GetMapping("/{partyId}")
    @ResponseBody
    public ResponseEntity<?> getChatList(
            @PathVariable(value="partyId") Integer partyId,
            ChatListRequestDto requestDto,
            HttpServletRequest request
    ) {
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Pageable pageable = PageRequest.of(requestDto.getPageNum()-1, requestDto.getPageSize());

        // 채팅 메시지 MongoDB에서 조회하는 로직 수행
        Page<ChatMessage> result = chatService.getPartyMessages(pageable, userId, partyId);

        //각각 response dto 매핑 하기
        ChatListResponseDto responseDto = ChatListResponseDto.builder()
                .chatMessages(result.getContent().stream().map(
                                (m) -> ChatListResponseDto.MessageDto.builder()
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
