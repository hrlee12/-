package com.chilbaeksan.mokaknyang.chat.service;

import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.chilbaeksan.mokaknyang.chat.repository.ChatRepository;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member_party.domain.MemberParty;
import com.chilbaeksan.mokaknyang.member_party.repository.MemberPartyRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
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
    private final MemberPartyRepository memberPartyRepository;

    @Transactional
    @Override
    public void saveMessage(ChatSendRequestDto chatSendRequestDto, Integer memberId, Integer partyId) {

    }

    @Override
    public List<ChatMessage> getPartyMessages(Pageable pageable, Integer memberId, Integer partyId) {
        // 파티 가입하고 있는지 확인
        MemberParty res = memberPartyRepository.findByMemberAndParty(Member.builder().memberId(memberId).build(), Party.builder().partyId(partyId).build())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_PARTY_UNAUTHORIZATION));

        //가입하고 있다면 데이터를 가지고 온다.
        return chatRepository.findByPartyId(partyId, pageable)
                .getContent();
    }
}
