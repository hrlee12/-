package com.chilbaeksan.mokaknyang.Invitation.repository;

import com.chilbaeksan.mokaknyang.Invitation.domain.Invitation;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvitationRepository extends JpaRepository<Invitation, Integer> {
    List<Invitation> findByMember(Member member);
}
