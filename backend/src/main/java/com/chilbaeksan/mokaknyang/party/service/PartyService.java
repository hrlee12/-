package com.chilbaeksan.mokaknyang.party.service;

import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.dto.request.PartyRegist;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {
    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;

    public Party registParty(PartyRegist partyRegist){
        Member partyManager = memberRepository.findByMemberId(partyRegist.getPartyManagerId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Party party = Party.builder()
                .name(partyRegist.getPartyName())
                .inviteMessage(partyRegist.getPartyInviteMessage())
                .maxNumber(partyRegist.getPartyMaxNumber())
                .participateNumber(partyRegist.getPartyParticipateNumber())
                .member(partyManager)
                .build();

        return partyRepository.save(party);
    }
}
