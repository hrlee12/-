package com.chilbaeksan.mokaknyang.party.domain;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;

import java.time.LocalDateTime;

@Entity
@Table(name="party")
@SQLDelete(sql = "UPDATE party SET party_deleted_at = NOW() WHERE party_id = ?")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="party_id")
    private Integer partyId;

    @Column(name="party_purpose")
    private String purpose;

    @Column(name="party_name")
    private String name;

    @Column(name="party_participate_number")
    private Byte participateNumber;

    @Column(name="party_max_number")
    private Byte maxNumber;

    @CreationTimestamp
    @Column(name="party_created_at")
    private LocalDateTime createdAt;

    @Column(name="party_deleted_at")
    private LocalDateTime deletedAt;

    @Column(name="party_is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;
}
