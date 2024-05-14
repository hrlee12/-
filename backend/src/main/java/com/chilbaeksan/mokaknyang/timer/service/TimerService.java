package com.chilbaeksan.mokaknyang.timer.service;

import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerLog;
import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TimerResultRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TimerTopProcessRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TopProcessAIResponseDto;

public interface TimerService {
    Timer registerTimer(TimerRegisterRequestDto dto, Integer manageId);

    TopProcessAIResponseDto setTopProcess(TimerTopProcessRequestDto dto, Integer userId);

    TimerLog setResult(TimerResultRequestDto dto, Integer userId);
}
