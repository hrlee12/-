package com.chilbaeksan.mokaknyang.timer.repository;

import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimerLogRepository extends JpaRepository<TimerLog, Integer> {

}
