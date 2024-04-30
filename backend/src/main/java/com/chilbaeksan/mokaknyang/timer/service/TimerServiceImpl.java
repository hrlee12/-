package com.chilbaeksan.mokaknyang.timer.service;


import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerType;
import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterRequestDto;
import com.chilbaeksan.mokaknyang.timer.repository.TimerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class TimerServiceImpl implements TimerService {
    private final TimerRepository timerRepository;

    @Override
    public void registerTimer(TimerRegisterRequestDto dto, Integer manageId) {
        Timer timer;
        try {
            timer = Timer.builder()
                    .timerManageId(manageId)
                    .groupType(TimerType.valueOf(dto.getType().toLowerCase()))
                    .timerStartTime(Timestamp.valueOf(dto.getStartTime()))
                    .timerEndPeriod(dto.getEndPeriod())
                    .timerConcentrateTime(dto.getConcentrateTime())
                    .timerRelaxTime(dto.getRelaxTime())
                    .build();
        }catch (Exception ex){
            throw new BaseException(ErrorCode.TIMER_REGISTER_BAD_REQUEST);
        }

        try{
            timerRepository.save(timer);
        }catch (Exception ex){
            throw  new BaseException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void setTopProcess() {

    }
}
