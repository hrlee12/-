package com.chilbaeksan.mokaknyang.auth.controller;

import com.chilbaeksan.mokaknyang.auth.dto.UserLoginDto;
import com.chilbaeksan.mokaknyang.auth.service.AuthService;
import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final AuthService authService;

    // register
    @PostMapping("/")
    public ResponseEntity<?> register(UserLoginDto dto) {

        return ResponseEntity.ok().build();
    }

    // login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserLoginDto dto, HttpServletRequest request) {
        // 유저 아이디 추출
        Optional<Integer> userId = jwtUtil.getUserId(request);

        //이미 로그인 중이라면?
        if(userId.isPresent()){
            throw new BaseException(ErrorCode.BAD_REQUEST);
        }
        //아니라면 로그인 수행
        authService.login(dto.getId(), dto.getPassword());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.BAD_REQUEST));
        return ResponseEntity.ok().build();
    }

}