package com.chilbaeksan.mokaknyang.party.service;

import com.chilbaeksan.mokaknyang.Invitation.domain.ApprovalStatus;
import com.chilbaeksan.mokaknyang.Invitation.domain.Invitation;
import com.chilbaeksan.mokaknyang.Invitation.repository.InvitationRepository;
import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.chat.domain.ChatMessage;
import com.chilbaeksan.mokaknyang.chat.repository.ChatRepository;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Cat;
import com.chilbaeksan.mokaknyang.member.domain.Level;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.repository.CatRepository;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.member_party.domain.MemberParty;
import com.chilbaeksan.mokaknyang.member_party.repository.MemberPartyRepository;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.party.dto.request.*;
import com.chilbaeksan.mokaknyang.party.dto.response.*;
import com.chilbaeksan.mokaknyang.party.repository.PartyRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PartyService {
    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;
    private final InvitationRepository invitationRepository;
    private final MemberPartyRepository memberPartyRepository;
    private final ChatRepository chatRepository;
    private final CatRepository catRepository;
    private final JwtUtil jwtUtil;

    public void registParty(HttpServletRequest httpServletRequest, PartyRegist partyRegist){
        //파티 생성
        int managerMemberId = jwtUtil.getUserId(httpServletRequest)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Member managerMember = memberRepository.findByMemberId(managerMemberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Party party = Party.builder()
                .name(partyRegist.getPartyName())
                .inviteMessage(partyRegist.getPartyInviteMessage())
                .participateNumber(partyRegist.getPartyParticipateNumber())
                .member(managerMember)
                .build();

        Party saveParty = partyRepository.save(party);

        //멤버 초대
        Party findParty = partyRepository.findByPartyId(saveParty.getPartyId())
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        //방장은 party를 생성하면 무조건 party에 속해있는 것이다.
        memberPartyRepository.save(MemberParty.builder()
                .member(managerMember)
                .party(findParty)
                .build());

        List<PartyMember> partyMembers = partyRegist.getPartyMembers();
        for(PartyMember partyMember : partyMembers){
            Member findMember = memberRepository.findByLoginId(partyMember.getMemberLoginId())
                    .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

            if(findMember.getMemberId() == managerMemberId)
                throw new BaseException(ErrorCode.PARTY_SELF_INVITATION_NOT_ALLOWED);

            if(invitationRepository.findByMemberAndParty(findMember, findParty).isPresent())
                throw new BaseException(ErrorCode.PARTY_INVITATION_ALREADY);

            LocalDateTime now = LocalDateTime.now();
            invitationRepository.save(Invitation.builder()
                    .member(findMember)
                    .party(findParty)
                    .createdAt(now)
                    .expireTime(now.plusMinutes(30))
                    .isAccepted(ApprovalStatus.WAIT)
                    .build());
        }
    }

    public InvitePartyList getInviteGroupList(HttpServletRequest httpServletRequest){
        int memberId = jwtUtil.getUserId(httpServletRequest)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        List<Invitation> invitationList = invitationRepository.findByMember(member);

        List<InviteParty> inviteParties = new ArrayList<>();
        for(Invitation invitation : invitationList){
            Party party = invitation.getParty();

            //삭제 된 그룹이면 초대 그룹 리스트에 가져오지 않는다
            if(party.getIsDeleted())
                continue;

            //초대 기간이 만료되었으면 가져오지 않는다
            if((invitation.getExpireTime()).isBefore(LocalDateTime.now()))
                continue;

            Member manager = invitation.getParty().getMember();

            inviteParties.add(
                    InviteParty.builder()
                            .memberId(manager.getMemberId())
                            .memberName(manager.getCatName())
                            .partyId(party.getPartyId())
                            .partyName(party.getName())
                            .expireTime(invitation.getExpireTime())
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

    public void inviteParty(HttpServletRequest httpServletRequest, Integer partyId, PartyInvite partyInvite){
        int memberId = jwtUtil.getUserId(httpServletRequest)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        if(memberId == partyInvite.getMemberId())
            throw new BaseException(ErrorCode.PARTY_SELF_INVITATION_NOT_ALLOWED);

        Member member = memberRepository.findByMemberId(partyInvite.getMemberId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        List<Invitation> invitationList = invitationRepository.findByParty(party);
        if(invitationList.size() == party.getMaxNumber())
            throw new BaseException(ErrorCode.PARTY_MAX_INVITATION);

        for(Invitation invitation : invitationList){
            if(invitation.getMember().getMemberId() == partyInvite.getMemberId())
                throw new BaseException(ErrorCode.PARTY_INVITATION_ALREADY);
        }

        LocalDateTime now = LocalDateTime.now();
        invitationRepository.save(Invitation.builder()
                .member(member)
                .party(party)
                .createdAt(now)
                .expireTime(now.plusMinutes(30))
                .isAccepted(ApprovalStatus.WAIT)
                .build());
    }

    public MemberParty acceptParty(Integer partyId, PartyAccept partyAccept){
        Member member = memberRepository.findByMemberId(partyAccept.getMemberId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        Invitation invitation = invitationRepository.findByMemberAndParty(member, party)
                .orElseThrow(() -> new BaseException(ErrorCode.INVITATION_NOT_FOUND));

        if(LocalDateTime.now().isAfter(invitation.getExpireTime())){
            throw new BaseException(ErrorCode.INVIATION_IS_NOT_VALID);
        }

        invitation.modifyIsAccepted(ApprovalStatus.ACCEPT);
        invitationRepository.save(invitation);

        if(memberPartyRepository.findByMemberAndParty(member, party).isPresent())
            throw new BaseException(ErrorCode.PARTY_ALREADY_ACCEPT);

        member.modifyParty(party);
        memberRepository.save(member);

        return memberPartyRepository.save(MemberParty.builder()
                .member(member)
                .party(party)
                .build());
    }

    public void rejectParty(Integer partyId, PartyReject partyReject){
        Member member = memberRepository.findByMemberId(partyReject.getMemberId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        Invitation invitation = invitationRepository.findByMemberAndParty(member, party)
                .orElseThrow(() -> new BaseException(ErrorCode.INVITATION_NOT_FOUND));

        if(LocalDateTime.now().isAfter(invitation.getExpireTime())){
            throw new BaseException(ErrorCode.INVIATION_IS_NOT_VALID);
        }

        invitation.modifyIsAccepted(ApprovalStatus.REJECT);
        invitationRepository.save(invitation);
    }

    public void leaveParty(HttpServletRequest httpServletRequest, Integer partyId){
        int memberId = jwtUtil.getUserId(httpServletRequest)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        Optional<MemberParty> memberParty = memberPartyRepository.findByMemberAndParty(member, party);

        if(memberParty.isEmpty())
            throw new BaseException(ErrorCode.MEMBER_PARTY_NOT_FOUND);

        if(memberParty.isPresent()){
            memberPartyRepository.delete(memberParty.get());
        }
    }

    public PartyJoinMemberList getPartyJoinMemberList(Integer partyId){
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        if(party.getIsDeleted())
            throw new BaseException(ErrorCode.PARTY_ALREADY_REMOVE);

        List<MemberParty> memberPartyList = memberPartyRepository.findByParty(party);

        int managerId = party.getMember().getMemberId();
        List<PartyJoinMember> members = new ArrayList<>();
        for(MemberParty memberParty : memberPartyList){
            int memberId = memberParty.getMember().getMemberId();

            if(memberRepository.findByMemberId(memberId).isEmpty())
                throw new BaseException(ErrorCode.MEMBER_NOT_FOUND);

            String name = memberParty.getMember().getCatName();

            if(catRepository.findByCatId(memberParty.getMember().getCat().getCatId()).isEmpty())
                throw new BaseException(ErrorCode.CAT_NOT_FOUND);

            Integer catId = memberParty.getMember().getCat().getCatId();

            members.add(
                    PartyJoinMember.builder()
                    .memberId(memberId)
                    .name(name)
                    .catId(catId)
                    .build()
            );
        }

        return PartyJoinMemberList.builder()
                .managerId(managerId)
                .members(members)
                .build();
    }

    public PartySettingInfo getPartySettingInfo(Integer partyId){
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        if(party.getIsDeleted())
            throw new BaseException(ErrorCode.PARTY_ALREADY_REMOVE);

        List<MemberParty> memberPartyList = memberPartyRepository.findByParty(party);
        List<PartySettingMember> partyMembers = new ArrayList<>();

        for(MemberParty memberParty : memberPartyList){
            Member member = memberParty.getMember();

            if(member.getIsDeleted())
                throw new BaseException(ErrorCode.MEMBER_ALREADY_REMOVE);

            if(member.getCat() == null)
                throw new BaseException(ErrorCode.CAT_IS_NULL);

            Cat cat = catRepository.findByCatId(memberParty.getMember().getCat().getCatId())
                    .orElseThrow(() -> new BaseException(ErrorCode.CAT_NOT_FOUND));

            partyMembers.add(
                    PartySettingMember.builder()
                    .memberId(member.getMemberId())
                    .memberCatName(member.getCatName())
                    .catId(cat.getCatId())
                    .partyCreatedAt(memberParty.getCreatedAt())
                    .build()
            );
        }

        return PartySettingInfo.builder()
                .partyGoal(party.getPurpose())
                .partyName(party.getName())
                .partyMaxNumber(party.getMaxNumber())
                .partyParticipateNumber(party.getParticipateNumber())
                .partyManagerId(party.getMember().getMemberId())
                .partyManagerName(party.getMember().getCatName())
                .partyMembers(partyMembers)
                .build();
    }

    public void updateParty(Integer partyId, PartyUpdate partyUpdate){
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        if(party.getIsDeleted())
            throw new BaseException(ErrorCode.PARTY_ALREADY_REMOVE);

        Member manager = memberRepository.findByMemberId(partyUpdate.getPartyManagerId())
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        party.modifyMember(manager);
        party.modifyName(partyUpdate.getPartyName());
        party.modifyPurpose(partyUpdate.getPartyGoal());

        partyRepository.save(party);
    }

    public HoverMemberInfo getHoverMemberInfo(Integer partyId, Integer memberId){
        Party party = partyRepository.findByPartyId(partyId)
                .orElseThrow(() -> new BaseException(ErrorCode.PARTY_NOT_FOUND));

        if(party.getIsDeleted())
            throw new BaseException(ErrorCode.PARTY_ALREADY_REMOVE);

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        MemberParty memberParty = memberPartyRepository.findByMemberAndParty(member, party)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_PARTY_NOT_FOUND));

        Member partyJoinMember = memberParty.getMember();
        Title title = partyJoinMember.getTitle();
        String titleContent = "";
        if(title!=null)
            titleContent = title.getTitleContent();

        Level level = partyJoinMember.getLevel();
        Short levelNum = 0;
        if(level != null)
            levelNum = level.getLevel();

        return HoverMemberInfo.builder()
                .name(partyJoinMember.getCatName())
                .title(titleContent)
                .level(levelNum)
                .exp(partyJoinMember.getExp())
                .hitNumber(partyJoinMember.getHitNumber())
                .behitNumber(partyJoinMember.getBehitNumber())
                .build();
    }

    public PartyJoinList getPartyJoinList(Integer pageNum, Integer pageSize, HttpServletRequest request){
        int memberId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Pageable pageable = PageRequest.of(pageNum-1, pageSize);
        Page<MemberParty> page = memberPartyRepository.findByMember(member, pageable);

        List<PartyJoin> partys = new ArrayList<>();
        for(MemberParty memberParty : page.getContent()){
            if(memberParty.getParty() == null)
                throw new BaseException(ErrorCode.PARTY_NOT_FOUND);

            Party party = memberParty.getParty();

//            ChatMessage chatMessage = chatRepository.findFirst1ByPartyIdOrderBySendTimeDesc(memberParty.getParty().getPartyId());

            partys.add(
                    PartyJoin.builder()
                            .partyId(party.getPartyId())
                            .partyGoal(party.getPurpose())
                            .partyName(party.getName())
                            .currentNum(party.getParticipateNumber())
                            .maxNum(party.getMaxNumber())
                            .lastChatter(null)
                            .lastChatContent(null)
                            .lastSendChatTime(null)
                    .build()
            );
        }

        return PartyJoinList.builder().partys(partys).build();
    }
}
