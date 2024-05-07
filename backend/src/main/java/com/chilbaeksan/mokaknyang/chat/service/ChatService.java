package com.chilbaeksan.mokaknyang.chat.service;

import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService  {
    void saveMessage(ChatSendRequestDto chatSendRequestDto, Integer memberId, Integer partyId);
    List<ChatMessage> getPartyMessages(Pageable pageable, Integer memberId,  Integer partyId);
}
