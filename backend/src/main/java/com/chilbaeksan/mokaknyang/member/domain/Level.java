package com.chilbaeksan.mokaknyang.member.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.type.descriptor.jdbc.SmallIntJdbcType;

@Entity
@Table(name="level")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Level {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "level", nullable = false)
    Short level;

    @Column(name= "level_exp")
    Integer levelExp;
}
