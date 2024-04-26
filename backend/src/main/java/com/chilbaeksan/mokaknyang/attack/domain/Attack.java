package com.chilbaeksan.mokaknyang.attack.domain;

import com.chilbaeksan.mokaknyang.attack_situation.domain.AttackSituation;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="attack")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Attack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="attack_id")
    private Integer attackId;

    @ManyToOne
    @JoinColumn(name="attack_situation_id", nullable = false)
    private AttackSituation attackSituation;

    @ManyToOne
    @JoinColumn(name="attack_hit_member", nullable = false)
    private Member hitMember;

    @ManyToOne
    @JoinColumn(name="attack_behit_member", nullable = false)
    private Member behitMember;

    @CreationTimestamp
    @Column(name="attack_created_at")
    private LocalDateTime createdAt;
}
