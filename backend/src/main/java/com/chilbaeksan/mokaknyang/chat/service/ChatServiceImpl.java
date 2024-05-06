package com.chilbaeksan.mokaknyang.chat.service;

import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.chilbaeksan.mokaknyang.chat.repository.ChatRepository;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
    private final ChatRepository chatRepository;

    @Transactional
    @Override
    public void saveMessage(ChatSendRequestDto chatSendRequestDto, Integer memberId, Integer partyId) {

    }

    @Override
    public List<ChatMessage> getPartyMessages(Pageable pageable, Integer partyId) {
        return chatRepository.findByPartyId(partyId, pageable)
                .getContent();
    }
}
