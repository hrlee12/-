package com.chilbaeksan.mokaknyang.attack_situation.domain;

import com.chilbaeksan.mokaknyang.group.domain.Group;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDateTime;

@Entity
@Table(name="attack_situation")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class AttackSituation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="attack_situation_id")
    private Integer attackSituationId;

    @ManyToOne
    @JoinColumn(name="group_id")
    private Group group;

    @Column(name="attack_situation_code")
    private AttackSituationCode attackSituationCode;

    @CreationTimestamp
    @Column(name="attack_situation_created_at")
    private LocalDateTime createdAt;
}
