package com.chilbaeksan.mokaknyang.member_group.entity;

import com.chilbaeksan.mokaknyang.group.entity.Group;
import com.chilbaeksan.mokaknyang.member.entity.Member;

import java.io.Serializable;

public class MemberGroupPK implements Serializable {
    private Member member;
    private Group group;
}
