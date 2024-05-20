package com.chilbaeksan.mokaknyang.auth.util;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.util.Optional;

@RequiredArgsConstructor
@Component
public class JwtUtil {
    private static final String BEARER_HEADER = "Bearer ";
    private static final String BLANK = "";

    public Optional<Integer> getUserId(HttpServletRequest request){
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        Integer userId = null;


        if(authorization != null && authorization.startsWith(BEARER_HEADER)){
            String jwtToken = authorization.replaceFirst(BEARER_HEADER, BLANK); // jwt access token 추출

            //TODO : JWT 적용 하여 유효성 검사 후 데이터 추출하기
            userId = Integer.valueOf(jwtToken);
        }

        return Optional.ofNullable(userId);
    }
}
