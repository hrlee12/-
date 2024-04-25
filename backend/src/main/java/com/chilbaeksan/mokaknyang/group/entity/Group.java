package com.chilbaeksan.mokaknyang.group.entity;

import com.chilbaeksan.mokaknyang.member.entity.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDateTime;

@Entity
@Table(name="`group`")
@SQLDelete(sql = "UPDATE group SET group_deleted_at = NOW() WHERE group_id = ?")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="group_id")
    private Integer groupId;

    @Column(name="group_purpose")
    private String purpose;

    @Column(name="group_name")
    private String name;

    @Column(name="group_participate_number")
    private Byte participateNumber;

    @Column(name="group_max_number")
    private Byte maxNumber;

    @CreationTimestamp
    @Column(name="group_created_at")
    private LocalDateTime createdAt;

    @Column(name="group_deleted_at")
    private LocalDateTime deletedAt;

    @Column(name="group_is_deleted")
    private Boolean isDeleted;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;
}
