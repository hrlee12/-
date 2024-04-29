package com.chilbaeksan.mokaknyang.party.service;

import com.chilbaeksan.mokaknyang.Invitation.domain.Invitation;
import com.chilbaeksan.mokaknyang.Invitation.repository.InvitationRepository;
import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.dto.request.PartyDelete;
import com.chilbaeksan.mokaknyang.party.dto.request.PartyRegist;
import com.chilbaeksan.mokaknyang.party.dto.response.InviteParty;
import com.chilbaeksan.mokaknyang.party.dto.response.InvitePartyList;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {
    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;
    private final InvitationRepository invitationRepository;
    private final JwtUtil jwtUtil;

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

    public InvitePartyList getInviteGroupList(HttpServletRequest httpServletRequest){
//        int memberId = jwtUtil.getUserId(httpServletRequest).get();
        int memberId = 1;
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        List<Invitation> invitationList = invitationRepository.findByMember(member);

        List<InviteParty> inviteParties = new ArrayList<>();
        for(Invitation invitation : invitationList){
            Party party = invitation.getParty();

            //삭제 된 그룹이면 초대 그룹 리스트에 가져오지 않는다
            if(party.getIsDeleted())
                continue;

            Member manager = invitation.getParty().getMember();

            inviteParties.add(
                    InviteParty.builder()
                            .memberId(manager.getMemberId())
                            .memberName(manager.getCatName())
                            .partyId(party.getPartyId())
                            .partyName(party.getName())
                            .expireTime(invitation.getCreatedAt().plus(30, ChronoUnit.MINUTES))
                            .build()
            );
        }

        return InvitePartyList.builder()
                .inviteList(inviteParties)
                .build();
    }

    public void deleteParty(PartyDelete partyDelete){
        Party party = partyRepository.findByPartyId(partyDelete.getPartyId())
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        if(party.getIsDeleted())
            throw new BaseException(ErrorCode.PARTY_ALREADY_REMOVE);

        partyRepository.delete(party);
    }
}
