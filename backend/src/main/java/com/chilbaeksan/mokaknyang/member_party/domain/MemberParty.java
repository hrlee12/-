package com.chilbaeksan.mokaknyang.member_party.domain;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@IdClass(MemberPartyPK.class)
@Entity
@Table(name="member_party")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class MemberParty {
    @Id
    @JoinColumn(name="member_id")
    @ManyToOne
    private Member member;

    @Id
    @JoinColumn(name="party_id")
    @ManyToOne
    private Party party;

    @CreationTimestamp
    @Column(name="party_created_at")
    private LocalDateTime createdAt;
}
