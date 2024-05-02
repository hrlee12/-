package com.chilbaeksan.mokaknyang.auth.controller;

import com.chilbaeksan.mokaknyang.auth.dto.SignInResponse;
import com.chilbaeksan.mokaknyang.auth.dto.UserLoginDto;
import com.chilbaeksan.mokaknyang.auth.service.AuthService;
import com.chilbaeksan.mokaknyang.auth.util.ClientUtils;
import com.chilbaeksan.mokaknyang.auth.util.JwtUtil;
import com.chilbaeksan.mokaknyang.auth.vo.Token;
import com.chilbaeksan.mokaknyang.exception.BaseException;
import com.chilbaeksan.mokaknyang.exception.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final JwtUtil jwtUtil;
    private final ClientUtils clientUtils;
    private final AuthService authService;

    // register
    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserLoginDto dto) {
        authService.register(dto);
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
        SignInResponse response = authService.login(dto.getId(), dto.getPassword(),clientUtils.getRemoteIP(request));

        // 쿠키 생성
        String cookie = authService.createHttpOnlyCookie("refreshToken", response.refreshToken());

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie)
                .body(response.accessToken());
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        // 유저 아이디 추출
        Integer userId = jwtUtil.getUserId(request)
                .orElseThrow(() -> new BaseException(ErrorCode.MEMBER_IS_NOT_LOGIN));

        // 쿠키 invalidate 하기
        String cookie = authService.setHttpOnlyCookieInvalidate("refreshToken");
        authService.logout(userId);

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie)
                .body(null);
    }

    // refresh token으로 access token 재발급 하기
    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@CookieValue(value = "refreshToken") String refreshToken){
        Token token = authService.refresh(refreshToken);
        // refresh-token을 http-only 쿠키로 전송
        String cookie = authService.createHttpOnlyCookie("refreshToken", token.getRefreshToken());

        return ResponseEntity.ok()
                .header("Set-Cookie", cookie)
                .body(token.getAccessToken()); // body에는 access token을 넣는다.
    }



}