package com.chilbaeksan.mokaknyang.exp.domain;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "exp")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_id")
    Integer expId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey =  @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    Member member;

    @Column(name = "exp_type", nullable = false)
    ExpType expType;

    @Column(name = "exp_related_id")
    Integer expRelatedId;

    @Column(name ="exp_quantity")
    Short expQuantity;

    @Column(name = "exp_contents", length = 100)
    String expContents;

    @CreationTimestamp
    @Column(name = "exp_created_at")
    Timestamp expCreatedAt;
}
