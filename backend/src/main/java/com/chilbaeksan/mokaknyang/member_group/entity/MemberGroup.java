package com.chilbaeksan.mokaknyang.member_group.entity;

import com.chilbaeksan.mokaknyang.group.entity.Group;
import com.chilbaeksan.mokaknyang.member.entity.Member;
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
    @JoinColumn(name="group_id")
    @ManyToOne
    private Group group;

    @CreationTimestamp
    @Column(name="group_created_at")
    private LocalDateTime createdAt;
}
