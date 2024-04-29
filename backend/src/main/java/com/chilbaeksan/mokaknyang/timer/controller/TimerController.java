package com.chilbaeksan.mokaknyang.timer.controller;

import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import com.chilbaeksan.mokaknyang.member.domain.Member;
import com.chilbaeksan.mokaknyang.member.dto.MemberModifyRequestDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberMyInfoResponseDto;
import com.chilbaeksan.mokaknyang.member.dto.MemberRegisterRequestDto;
import com.chilbaeksan.mokaknyang.member.service.MemberService;
import com.chilbaeksan.mokaknyang.timer.dto.TimerRegisterRequestDto;
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

    @PostMapping
    public ResponseEntity<?> registerTimer(TimerRegisterRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        return ResponseEntity.ok().build();
    }

    //최상단 프로세스 변경 서버 전송
    @PostMapping("/top-process")
    public ResponseEntity<?> setTopProcess(@RequestBody ,HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        return ResponseEntity.ok().build();
    }

    //뽀모도로 결과 산정
    @PatchMapping
    public ResponseEntity<?> modifyUserInfo(@RequestBody MemberModifyRequestDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN)); // 없으면 로그인 안된거임

        return ResponseEntity.ok().build();
    }
}
