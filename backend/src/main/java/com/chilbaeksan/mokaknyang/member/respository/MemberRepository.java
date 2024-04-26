package com.chilbaeksan.mokaknyang.member.respository;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByLoginIdAndLoginPwd(String id, String pwd);
    Optional<Member> findByLoginId(String id);
}
