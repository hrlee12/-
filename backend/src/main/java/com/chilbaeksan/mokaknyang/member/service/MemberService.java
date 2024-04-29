package com.chilbaeksan.mokaknyang.member.service;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.dto.MemberModifyRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberRegisterRequestDto;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    Optional<Member> getMyInfo(Integer userId);

    void setMyInfo(MemberRegisterRequestDto dto, Integer userId);

    void modifyMyInfo(MemberModifyRequestDto dto, Integer userId);
}
