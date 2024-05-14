package com.chilbaeksan.mokaknyang.timer.controller;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.domain.TimerType;
import com.chilbaeksan.mokaknyang.timer.dto.*;
import com.chilbaeksan.mokaknyang.timer.service.TimerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pomodoro")
public class TimerController {
    private final JwtUtil jwtUtil;
    private final TimerService timerService;
    @PostMapping
    public ResponseEntity<?> registerTimer(@RequestBody TimerRegisterRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        Timer timer = null;
        // 관리번호에 따라서 삽입하는 아이디 다름
        if(TimerType.valueOf(dto.getType().toUpperCase()) == TimerType.PARTY){
            timer = timerService.registerTimer(dto, dto.getGroupId());
        }else{
            timer = timerService.registerTimer(dto, userId);
        }

        TimerRegisterResponseDto responseDto = TimerRegisterResponseDto.builder()
                .timerId(timer.getTimerId())
                .build();

        return ResponseEntity.ok(responseDto);
    }

    //최상단 프로세스 변경 서버 전송
    @PostMapping("/top-process")
    public ResponseEntity<?> setTopProcess(@RequestBody TimerTopProcessRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거
        TopProcessAIResponseDto res = timerService.setTopProcess(dto, userId);
        return ResponseEntity.ok(res);
    }

    //뽀모도로 결과 산정
    @PostMapping("/result")
    public ResponseEntity<?> getResult(@RequestBody TimerResultRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        timerService.setResult(dto,userId);
        return ResponseEntity.ok().build();
    }
}
