package com.chilbaeksan.mokaknyang.member.service;

import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Cat;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.dto.MemberModifyRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberRegisterRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberTitleResponseDto;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.member.repository.TitleRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final TitleRepository titleRepository;

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

}
