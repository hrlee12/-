package com.chilbaeksan.mokaknyang.member.repository;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByMemberId(Integer memberId);
}
