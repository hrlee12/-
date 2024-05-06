package com.chilbaeksan.mokaknyang.chat.service;

import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messageSendingOperations;

    //구독자에게 메시지가 왔다면 처리할 내용들
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = (String) redisTemplate.getValueSerializer().deserialize(message.getBody());
            ChatSendRequestDto chatMessageRequestDto = objectMapper.readValue(publishMessage, ChatSendRequestDto.class);
            messageSendingOperations.convertAndSend("/sub/chats/" + chatMessageRequestDto.getPartyId(), chatMessageRequestDto);
        } catch (JsonMappingException e) {
            throw new RuntimeException(e);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
