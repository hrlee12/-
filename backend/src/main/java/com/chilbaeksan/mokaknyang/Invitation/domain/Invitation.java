package com.chilbaeksan.mokaknyang.Invitation.domain;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.party.domain.Party;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="invitation")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="invitation_id")
    private Integer invitationId;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name="party_id", nullable = false)
    private Party party;

    @CreationTimestamp
    @Column(name="invitation_created_at")
    private LocalDateTime createdAt;

    @Column(name="invitation_is_accepted")
    private ApprovalStatus isAccepted;

    @Column(name="invitation_expire_time")
    private LocalDateTime expireTime;
}
