package com.chilbaeksan.mokaknyang.timer.service;


import com.chilbaeksan.mokaknyang.auth.domain.Login;
import com.chilbaeksan.mokaknyang.auth.repository.LoginRepository;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.exp.domain.Exp;
import com.chilbaeksan.mokaknyang.exp.domain.ExpType;
import com.chilbaeksan.mokaknyang.exp.repository.ExpRepository;
import com.chilbaeksan.mokaknyang.member.domain.Level;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.repository.LevelRepository;
import com.chilbaeksan.mokaknyang.member.repository.MemberRepository;
import com.chilbaeksan.mokaknyang.timer.controller.AIClient;
import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerLog;
import com.chilbaeksan.mokaknyang.timer.domain.TimerType;
import com.chilbaeksan.mokaknyang.timer.dto.*;
import com.chilbaeksan.mokaknyang.timer.repository.TimerLogRepository;
import com.chilbaeksan.mokaknyang.timer.repository.TimerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class TimerServiceImpl implements TimerService {
    private final TimerRepository timerRepository;
    private final ExpRepository expRepository;
    private final TimerLogRepository timerLogRepository;
    private final LoginRepository loginRepository;
    private final MemberRepository memberRepository;
    private final LevelRepository levelRepository;
    private final AIClient aiClient;

    @Override
    public Timer registerTimer(TimerRegisterRequestDto dto, Integer manageId) {
        Timer timer;
        try {
            timer = Timer.builder()
                    .timerManageId(manageId)
                    .groupType(TimerType.valueOf(dto.getType().toUpperCase()))
                    .timerStartTime(Timestamp.valueOf(dto.getStartTime()))
                    .timerEndPeriod(dto.getEndPeriod())
                    .timerConcentrateTime(dto.getConcentrateTime())
                    .timerRelaxTime(dto.getRelaxTime())
                    .build();
        }catch (Exception ex){
            throw new BaseException(ErrorCode.TIMER_REGISTER_BAD_REQUEST);
        }

        try{
            return timerRepository.save(timer);
        }catch (Exception ex){
            throw  new BaseException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @Override
    public TopProcessAIResponseDto setTopProcess(TimerTopProcessRequestDto dto, Integer userId) {
        Login loginInfo = loginRepository.findByMemberId(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        Member member = memberRepository.findByMemberId(userId)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        String process;
        if(dto.getUrl().equals("") || dto.getUrl() == null){
            process = dto.getTop();
        }else{
            process = dto.getTop() + " - " + dto.getUrl();
        }

        TopProcessAIRequestDto req = TopProcessAIRequestDto.builder()
                .goal(member.getGoal())
                .process(process)
                .build();

        TopProcessAIResponseDto result = aiClient.isRelatedWithGoal(req);

        // redis내에 현재 프로세스 변경
        loginInfo.setCurrentProcess(dto.getTop());
        loginInfo.setCurrentUrl(dto.getUrl());

        return result;
    }

    @Transactional
    @Override
    public TimerLog setResult(TimerResultRequestDto dto, Integer userId) {
        String message = "뽀모도로 타이머 "+dto.getPeriod()+" 주기 완료";
        TimerLog log = TimerLog.builder()
                .timer(Timer.builder()
                        .timerId(dto.getTimerId())
                        .build())
                .member(Member.builder()
                        .memberId(userId)
                        .build())
                .timerLogQuantity(dto.getPeriod())
                .timerLogContents(message)
                .build();

        Member member = memberRepository.findByMemberId(userId)
                .orElseThrow( () -> new BaseException(ErrorCode.MEMBER_NOT_FOUND));

        member.setExp(member.getExp() + 10);

        Exp exp = Exp.builder()
                .expType(ExpType.TIMER)
                .expContents(message)
                .member(member)
                .expRelatedId(dto.getTimerId())
                .expQuantity((short) 10)
                .build();

        expRepository.save(exp);

        // 레벨업 로직
        Level level = levelRepository.findById(member.getLevel().getLevel())
                    .orElseThrow(() -> new BaseException(ErrorCode.LEVEL_INVALID_VALUE));

        while(member.getExp() >= level.getLevelExp() && member.getLevel().getLevel() < 999){
            level = levelRepository.findById((short) (member.getLevel().getLevel() + 1))
                    .orElseThrow(()->new BaseException(ErrorCode.LEVEL_INVALID_VALUE));
            member.setLevel(level);
        }

        return timerLogRepository.save(log);
    }
}
