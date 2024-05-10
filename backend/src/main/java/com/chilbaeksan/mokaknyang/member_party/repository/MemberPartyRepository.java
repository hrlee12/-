package com.chilbaeksan.mokaknyang.member_party.repository;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member_party.domain.MemberParty;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberPartyRepository extends JpaRepository<MemberParty, Integer> {
    Optional<MemberParty> findByMemberAndParty(Member member, Party party);
    List<MemberParty> findByParty(Party party);
    List<MemberParty> findByMember(Member member);
}
