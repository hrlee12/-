package com.chilbaeksan.mokaknyang.member.domain;

import com.chilbaeksan.mokaknyang.party.domain.Party;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Entity
@Table(name="member")
@SQLDelete(sql = "UPDATE member SET member_deleted_at = NOW() WHERE member_id = ?")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Builder
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="member_id")
    private Integer memberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="level", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Level level;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="title_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Title title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cat_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Cat cat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="party_id", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Party party;

    @Column(name="member_login_id")
    private String loginId;

    @Column(name="member_login_pwd")
    private String loginPwd;

    @Column(name="member_cat_name")
    @Builder.Default
    private String catName = "고먐미";

    @Column(name="member_goal")
    @Builder.Default
    private String goal = "";

    @Column(name="member_exp")
    @Builder.Default
    private Integer exp = 0;

    @CreationTimestamp
    @Column(name="member_created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name="member_updated_at")
    private LocalDateTime updatedAt;

    @Column(name="member_deleted_at")
    private LocalDateTime deletedAt;

    @Column(name="member_is_deleted")
    @Builder.Default
    private Boolean isDeleted=false;

    @Column(name="member_hit_number")
    @Builder.Default
    private Integer hitNumber=0;

    @Column(name="member_behit_number")
    @Builder.Default
    private Integer behitNumber=0;

    public void hit(){
        this.hitNumber += 1;
    }

    public void behit(){
        this.behitNumber += 1;
    }

    public void modifyParty(Party party) { this.party = party; }
}
