package com.chilbaeksan.mokaknyang.member.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="cat")
@Getter
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Cat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cat_id")
    private Integer catId;

    @Column(name = "cat_asset_url")
    private String catAssetUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="cat_achieve_level", foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    private Level catAchieveLevel;
}
