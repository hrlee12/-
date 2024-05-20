package com.chilbaeksan.mokaknyang.member.service;

import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Cat;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.dto.*;
import com.chilbaeksan.mokaknyang.member.repository.CatRepository;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.member.repository.TitleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final TitleRepository titleRepository;
    private final CatRepository catRepository;

    @Override
    public Optional<Member> getMyInfo(Integer userId) {
        return memberRepository.findByMemberId(userId);
    }

    @Transactional
    @Override
    public void setMyInfo(MemberRegisterRequestDto dto, Integer userId) {
        Member member = memberRepository.findByMemberId(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        member.setCatName(dto.getMemberCatName());
        member.setGoal(dto.getMemberGoal());
    }

    @Transactional
    @Override
    public void modifyMyInfo(MemberModifyRequestDto dto, Integer userId) {
        Member member = memberRepository.findByMemberId(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        member.setCatName(dto.getMemberCatName());
        member.setGoal(dto.getMemberGoal());
        member.setTitle(Title.builder().titleId(dto.getTitleId()).build());
    }

    @Override
    public Member findMemberByUserId(String userId) {
        return memberRepository.findByLoginId(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_SEARCH_NOT_FOUND_USER_ID));
    }

    @Override
    public List<Title> getTitles(Pageable pageable) {
        return titleRepository.findAll(pageable).getContent();
    }

    @Override
    public List<Cat> getCat(Pageable pageable) {
        return catRepository.findAll(pageable).getContent();
    }

    @Transactional
    @Override
    public Cat setSkin(Integer memberId,Integer catId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        Cat cat = catRepository.findByCatId(catId)
                .orElseThrow(() -> new BaseException(ErrorCode.CAT_NOT_FOUND));

        // 만약 레벨 달성을 하지 못했다면
        if(cat.getCatAchieveLevel().getLevel() > member.getLevel().getLevel()){
            throw new BaseException(ErrorCode.LEVEL_NOT_ENOUGH_LEVEL);
        }

        member.setCat(cat);
        memberRepository.save(member);

        return cat;
    }

    @Transactional
    @Override
    public Member getJoinParty(Integer memberId){ return memberRepository.findByMemberId(memberId)
            .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));}

    @Override
    public MemberFindCatListResponse findByMemberId(MemberFindCatListRequest memberFindCatListRequest) {
        List<MemberFindCatResponse> catIdList = new ArrayList<>();

        for(MemberFindCatRequest memberFindCatRequest : memberFindCatListRequest.getMemberIdList()){
            Member member = memberRepository.findByMemberId(memberFindCatRequest.getMemberId())
                    .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

            Cat cat = catRepository.findByCatId(member.getCat().getCatId())
                            .orElseThrow(() -> new BaseException(ErrorCode.CAT_NOT_FOUND));

            catIdList.add(MemberFindCatResponse.builder()
                    .memberId(member.getMemberId())
                    .catId(cat.getCatId())
                    .build());
        }

        return MemberFindCatListResponse.builder()
                .catIdList(catIdList)
                .build();
    }
}
