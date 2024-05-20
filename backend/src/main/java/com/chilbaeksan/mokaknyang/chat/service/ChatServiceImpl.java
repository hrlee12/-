package com.chilbaeksan.mokaknyang.chat.service;

import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.dto.ChatSendRequestDto;
import com.chilbaeksan.mokaknyang.chat.dto.PublishMessage;
import com.chilbaeksan.mokaknyang.chat.repository.ChatRepository;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.member_party.domain.MemberParty;
import com.chilbaeksan.mokaknyang.member_party.repository.MemberPartyRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.flogger.Flogger;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{
    private final ChatRepository chatRepository;
    private final MemberPartyRepository memberPartyRepository;
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;

    private final RedisPublisher redisPublisher;
    private final RedisSubscriber redisSubscriber;

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    private Map<String, ChannelTopic> topics;

    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }

    private ChannelTopic getTopic(Integer partyId){
        return new ChannelTopic("party_"+ partyId);
    }

    @Override
    public void publishMessage(ChatSendRequestDto chatSendRequestDto, Integer memberId, Integer partyId) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        // 만약 해당 서버가 해당 토픽에 대해서 구독이 안되어 있는 부분이면 구독 리스너를 달아놓는다.
        ChannelTopic topic = topics.get(String.valueOf(partyId));

        if (topic == null) {
            topic = getTopic(partyId);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(String.valueOf(partyId), topic);
        }

        //메시지 발행 수행
        PublishMessage message = PublishMessage.builder()
                .partyId(partyId)
                .senderId(memberId)
                .sendNickname(member.getCatName())
                .contents(chatSendRequestDto.getContents())
                .sendTime(LocalDateTime.now().toString())
                .build();

        redisPublisher.publish(getTopic(partyId), message);
        
        // TODO: Redis에서 전송 즉시 캐싱하기
    }

    //DB에 저장
    @Transactional
    @Override
    public void saveMessage(ChatSendRequestDto chatSendRequestDto, Integer memberId, Integer partyId) {
        // 각 맴버 및 파티 유효성 검사
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        Party party = partyRepository.findByPartyId(partyId).orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        // 채팅을 저장한다.
        ChatMessage entity;
        try{
            entity = ChatMessage.builder()
                    .partyId(partyId)
                    .senderId(memberId)
                    .senderNickname(member.getCatName())
                    .contents(chatSendRequestDto.getContents())
                    .sendTime(LocalDateTime.now().toString())
                    .build();
        }catch(Exception e){
            throw new BaseException(ErrorCode.CHAT_BAD_REQUEST);
        }
        chatRepository.save(entity);
    }

    // 정보 조회
    @Override
    public Page<ChatMessage> getPartyMessages(Pageable pageable, Integer memberId, Integer partyId) {
        // 파티 가입하고 있는지 확인
        MemberParty res = memberPartyRepository.findByMemberAndParty(Member.builder().memberId(memberId).build(), Party.builder().partyId(partyId).build())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_PARTY_UNAUTHORIZATION));

        //가입하고 있다면 데이터를 가지고 온다.
        Page<ChatMessage> result =  chatRepository.findAllByPartyIdOrderBySendTimeDesc(partyId, pageable);
        log.info(result.getContent().toString());
        return result;

        // TODO: Redis 캐싱 기법 적용하여, 조회 속도 빠르게 하기
    }
}
