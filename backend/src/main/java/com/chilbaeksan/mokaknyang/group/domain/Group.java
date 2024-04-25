package com.chilbaeksan.mokaknyang.group.domain;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDateTime;

@Entity
@Table(name="`group`")
@SQLDelete(sql = "UPDATE group SET group_deleted_at = NOW() WHERE group_id = ?")
@AllArgsConstructor
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;
}
