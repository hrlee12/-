package com.chilbaeksan.mokaknyang.member_party.domain;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.member.domain.Member;

import java.io.Serializable;

public class MemberPartyPK implements Serializable {
    private Member member;
    private Party party;
}
