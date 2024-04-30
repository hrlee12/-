package com.chilbaeksan.mokaknyang.timer.service;

import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterRequestDto;

public interface TimerService {
    void registerTimer(TimerRegisterRequestDto dto, Integer manageId);

    void setTopProcess();
}
