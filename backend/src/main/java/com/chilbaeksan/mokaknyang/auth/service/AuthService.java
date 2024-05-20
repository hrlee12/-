package com.chilbaeksan.mokaknyang.auth.service;

import com.chilbaeksan.mokaknyang.auth.dto.SignInResponse;
import com.chilbaeksan.mokaknyang.auth.dto.UserLoginDto;
import com.chilbaeksan.mokaknyang.auth.vo.Token;
import org.springframework.http.ResponseCookie;

public interface AuthService {

    void register(UserLoginDto dto);

    SignInResponse login(String id, String password, String ip);

    void logout(Integer userId);

    String createHttpOnlyCookie(String cookieName, String cookieValue);

    //리프레시 토큰 담긴 쿠키 만료 시키기
    String setHttpOnlyCookieInvalidate(String cookieName);

    Token refresh(String refreshToken);
}
