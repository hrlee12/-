package com.chilbaeksan.mokaknyang.member.service;

import com.chilbaeksan.mokaknyang.member.domain.Cat;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.domain.Title;
import com.chilbaeksan.mokaknyang.member.dto.MemberFindCatListRequest;
import com.chilbaeksan.mokaknyang.member.dto.MemberFindCatListResponse;
import com.chilbaeksan.mokaknyang.member.dto.MemberModifyRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberRegisterRequestDto;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Optional<Member> getMyInfo(Integer userId);

    void setMyInfo(MemberRegisterRequestDto dto, Integer userId);

    void modifyMyInfo(MemberModifyRequestDto dto, Integer userId);

    Member findMemberByUserId(String userId);

    List<Title> getTitles(Pageable pageable);

    List<Cat> getCat(Pageable pageable);

    Cat setSkin(Integer userId, Integer catId);

    Member getJoinParty(Integer memberId);

    MemberFindCatListResponse findByMemberId(MemberFindCatListRequest memberFindCatListRequest);
}
