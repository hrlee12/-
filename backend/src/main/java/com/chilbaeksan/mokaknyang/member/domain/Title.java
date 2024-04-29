package com.chilbaeksan.mokaknyang.member.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="Title")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Title {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "title_id", nullable = false)
    private Short titleId; // 칭호 아이딛

    @Column(name = "title_content")
    private String titleContent; // 칭호 내용

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "title_achieve_level", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Level titleAchieveLevel; // 달성레벨

}
