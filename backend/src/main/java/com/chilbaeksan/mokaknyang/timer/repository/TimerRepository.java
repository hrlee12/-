package com.chilbaeksan.mokaknyang.timer.repository;

import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TimerRepository extends JpaRepository<Timer, Integer> {
    Optional<Timer> findByGroupTypeAndTimerManageId(TimerType groupType, Integer manageId);
}
