package com.chilbaeksan.mokaknyang.Invitation.repository;

import com.chilbaeksan.mokaknyang.Invitation.domain.Invitation;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, Integer> {
    List<Invitation> findByMember(Member member);
    List<Invitation> findByParty(Party party);
    Optional<Invitation> findByMemberAndParty(Member member, Party party);
}
