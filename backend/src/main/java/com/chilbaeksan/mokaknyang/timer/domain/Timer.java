package com.chilbaeksan.mokaknyang.timer.domain;


import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "timer")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Timer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "timer_id")
    private Integer timerId;

    @Column(name = "group_type")
    private TimerType groupType;

    @Column(name = "timer_mange_id")
    private Integer timerManageId;

    @Column(name = "timer_start_time")
    private Timestamp timerStartTime;

    @Column(name = "timer_end_period")
    @ColumnDefault("3")
    private Short timerEndPeriod;

    @Column(name = "timer_concentrate_time")
    @ColumnDefault("25")
    private Short timerConcentrateTime;

    @Column(name = "timer_relax_time")
    @ColumnDefault("5")
    private Short timerRelaxTime;

    @CreationTimestamp
    @Column(name = "timer_created_at")
    private Timestamp timerCreatedAt;

}
