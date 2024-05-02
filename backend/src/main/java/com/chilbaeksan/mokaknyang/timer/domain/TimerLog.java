package com.chilbaeksan.mokaknyang.timer.domain;

import com.chilbaeksan.mokaknyang.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "timer_log")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TimerLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="timer_log_id")
    Integer timerLogId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "timer_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    Timer timer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, foreignKey = @ForeignKey(ConstraintMode.NO_CONSTRAINT))
    Member member;

    @Column(name ="timer_log_quantity")
    Short timerLogQuantity;

    @Column(name ="timer_log_contents", length = 100)
    String timerLogContents;

    @CreationTimestamp
    @Column(name ="timer_log_created_at")
    Timestamp timerLogCreatedAt;
}
