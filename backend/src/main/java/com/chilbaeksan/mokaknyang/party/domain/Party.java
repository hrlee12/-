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
@SQLDelete(sql = "UPDATE party SET party_deleted_at = NOW(), party_is_deleted = true WHERE party_id = ?")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Party {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="party_id")
    private Integer partyId;

    @Column(name="party_name")
    private String name;

    @Column(name="party_purpose")
    private String purpose;

    @Column(name="party_invite_message")
    private String inviteMessage;

    @Column(name="party_participate_number", nullable = false)
    private Byte participateNumber;

    @Column(name="party_max_number", nullable = false)
    @Builder.Default
    private Byte maxNumber = 6;

    @CreationTimestamp
    @Column(name="party_created_at")
    private LocalDateTime createdAt;

    @Column(name="party_deleted_at")
    private LocalDateTime deletedAt;

    @Column(name="party_is_deleted")
    @Builder.Default
    private Boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Member member;

    public void modifyMember(Member member){
        this.member = member;
    }
    public void modifyPurpose(String purpose){
        this.purpose = purpose;
    }

    public void modifyName(String name){
        this.name = name;
    }
}
