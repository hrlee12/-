package com.chilbaeksan.mokaknyang.member.repository;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByMemberId(Integer memberId);
    Optional<Member> findByLoginIdAndLoginPwd(String id, String pwd);
    Optional<Member> findByLoginId(String id);
}
