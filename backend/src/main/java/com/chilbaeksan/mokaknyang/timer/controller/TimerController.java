package com.chilbaeksan.mokaknyang.timer.controller;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.dto.MemberModifyRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberMyInfoResponseDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberRegisterRequestDto;
import com.chilbaeksan.mokaknyang.member.service.MemberService;
import com.chilbaeksan.mokaknyang.timer.domain.Timer;
import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterResponseDto;
import com.chilbaeksan.mokaknyang.timer.dto.TimerResultRequestDto;
import com.chilbaeksan.mokaknyang.timer.dto.TimerTopProcessRequestDto;
import com.chilbaeksan.mokaknyang.timer.service.TimerService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/pomodoro")
public class TimerController {
    private final JwtUtil jwtUtil;
    private final TimerService timerService;
    @PostMapping
    public ResponseEntity<?> registerTimer(TimerRegisterRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        Timer timer = null;
        // 관리번호에 따라서 삽입하는 아이디 다름
        if(dto.getType().equalsIgnoreCase("group")){
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
        timerService.setTopProcess(dto, userId);
        return ResponseEntity.ok().build();
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
