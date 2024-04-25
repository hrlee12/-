package com.chilbaeksan.mokaknyang.member_group.domain;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.member.domain.Member;

import java.io.Serializable;

public class MemberGroupPK implements Serializable {
    private Member member;
    private Party party;
}
