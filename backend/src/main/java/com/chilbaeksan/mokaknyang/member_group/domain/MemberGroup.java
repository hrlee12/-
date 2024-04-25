package com.chilbaeksan.mokaknyang.member_group.domain;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@IdClass(MemberGroupPK.class)
@Entity
@Table(name="member_group")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class MemberGroup{
    @Id
    @JoinColumn(name="member_id")
    @ManyToOne
    private Member member;

    @Id
    @JoinColumn(name="party_id")
    @ManyToOne
    private Party party;

    @CreationTimestamp
    @Column(name="group_created_at")
    private LocalDateTime createdAt;
}
