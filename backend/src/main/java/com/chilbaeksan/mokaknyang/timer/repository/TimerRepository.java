package com.chilbaeksan.mokaknyang.timer.repository;

import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimerRepository extends JpaRepository<Timer, Integer> {

}
